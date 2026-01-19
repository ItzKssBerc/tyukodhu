'use server'

import Redis from 'ioredis';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// Initialize Redis client with optimized settings for Serverless
const redis = new Redis(process.env.REDIS_URL || '', {
  maxRetriesPerRequest: 1, // Fail fast if connection is lost
  connectTimeout: 10000, // 10 seconds timeout
  lazyConnect: true, // Connect only when needed
  retryStrategy: (times) => {
    // Retry up to 3 times with increasing delay
    if (times > 3) {
      return null;
    }
    return Math.min(times * 50, 2000);
  },
});

export async function vote(pollId: string, optionIndex: number, allowChange: boolean = false) {
  const cookieStore = await cookies();
  const cookieName = `poll_${pollId}`;
  const existingVote = cookieStore.get(cookieName);

  if (existingVote) {
    if (!allowChange) {
      return { success: false, message: 'Már szavaztál ebben a kérdésben!' };
    }

    // If change is allowed, decrement the old vote
    // Handle legacy 'true' value
    if (existingVote.value !== 'true') {
        const oldOptionIndex = parseInt(existingVote.value, 10);
        
        // If the user voted for the same option, do nothing
        if (oldOptionIndex === optionIndex) {
            return { success: true, message: 'Ugyanarra szavaztál.' };
        }

        if (!isNaN(oldOptionIndex)) {
          try {
            await redis.hincrby(`poll:${pollId}`, `option:${oldOptionIndex}`, -1);
          } catch (error) {
            console.error('Error decrementing old vote:', error);
            // Continue even if decrement fails, to allow new vote
          }
        }
    }
  }

  try {
    // Increment the new vote count
    await redis.hincrby(`poll:${pollId}`, `option:${optionIndex}`, 1);
    
    // Set cookie with the option index
    cookieStore.set(cookieName, optionIndex.toString(), { 
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    revalidatePath('/'); 
    revalidatePath('/szavazasok');
    return { success: true };
  } catch (error) {
    console.error('Vote error:', error);
    return { success: false, message: 'Hiba történt a szavazás során. Kérjük, próbálja újra!' };
  }
}

export async function getPollResults(pollId: string): Promise<Record<string, number>> {
  try {
    // Set a timeout for the read operation to avoid blocking the page load too long
    // If Redis is slow, we return empty results rather than crashing/hanging
    const results = await Promise.race([
        redis.hgetall(`poll:${pollId}`),
        new Promise<null>((_, reject) => setTimeout(() => reject(new Error('Redis timeout')), 2000))
    ]) as Record<string, string> | null;
    
    const numericResults: Record<string, number> = {};
    
    if (results) {
        Object.entries(results).forEach(([key, value]) => {
            numericResults[key] = Number(value);
        });
    }
    
    return numericResults;
  } catch (error) {
    console.error('Get results error:', error);
    // Return empty object on error so the page still loads
    return {};
  }
}
