'use server'

import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function vote(pollId: string, optionIndex: number, allowChange: boolean = false) {
  const cookieStore = await cookies();
  const cookieName = `poll_${pollId}`;
  const existingVote = cookieStore.get(cookieName);

  if (existingVote) {
    if (!allowChange) {
      return { success: false, message: 'Már szavaztál ebben a kérdésben!' };
    }

    // If change is allowed, decrement the old vote
    if (existingVote.value !== 'true') {
        const oldOptionIndex = parseInt(existingVote.value, 10);
        
        if (oldOptionIndex === optionIndex) {
            return { success: true, message: 'Ugyanarra szavaztál.' };
        }

        if (!isNaN(oldOptionIndex)) {
          try {
            // Use a pipeline to ensure operations are sent together (though not strictly atomic without Lua)
            // But here we just want to prevent negative values
            const currentVal = await kv.hget(`poll:${pollId}`, `option:${oldOptionIndex}`) as number | null;
            
            if (currentVal && Number(currentVal) > 0) {
                await kv.hincrby(`poll:${pollId}`, `option:${oldOptionIndex}`, -1);
            } else {
                // If value is 0 or null, reset it to 0 just in case
                await kv.hset(`poll:${pollId}`, { [`option:${oldOptionIndex}`]: 0 });
            }
          } catch (error) {
            console.error('Error decrementing old vote:', error);
          }
        }
    }
  }

  try {
    // Increment the new vote count
    await kv.hincrby(`poll:${pollId}`, `option:${optionIndex}`, 1);
    
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
    return { success: false, message: 'Hiba történt a szavazás során.' };
  }
}

export async function getPollResults(pollId: string): Promise<Record<string, number>> {
  try {
    const results = await kv.hgetall(`poll:${pollId}`);
    
    const numericResults: Record<string, number> = {};
    
    if (results) {
        Object.entries(results).forEach(([key, value]) => {
            // Ensure we don't return negative numbers to the client
            numericResults[key] = Math.max(0, Number(value));
        });
    }
    
    return numericResults;
  } catch (error) {
    console.error('Get results error:', error);
    return {};
  }
}
