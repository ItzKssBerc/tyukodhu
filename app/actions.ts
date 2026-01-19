'use server'

import Redis from 'ioredis';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// Initialize Redis client
// Removed lazyConnect to see if it fixes connection issues
const redis = new Redis(process.env.REDIS_URL || '', {
  maxRetriesPerRequest: 1,
  connectTimeout: 10000,
  retryStrategy: (times) => {
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
    // Return the actual error message in development for debugging
    const errorMessage = process.env.NODE_ENV === 'development' 
        ? `Hiba: ${error instanceof Error ? error.message : String(error)}`
        : 'Hiba történt a szavazás során. Kérjük, próbálja újra!';
        
    return { success: false, message: errorMessage };
  }
}

export async function getPollResults(pollId: string): Promise<Record<string, number>> {
  try {
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
    return {};
  }
}
