import { createReader } from '@keystatic/core/reader';
import config from '../../../keystatic.config';
import PollCard from '@/components/PollCard';
import { getPollResults } from '@/app/actions';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Szavazások - Tyukod',
  description: 'Aktuális szavazások Tyukod község életével kapcsolatban.',
};

export default async function PollsPage() {
  const reader = createReader(process.cwd(), config);
  const polls = await reader.collections.polls.all();
  
  // Filter active polls
  const activePolls = polls.filter(poll => poll.entry.isActive);
  
  // Sort by date (newest first)
  activePolls.sort((a, b) => {
    const dateA = new Date(a.entry.publishedDate || 0).getTime();
    const dateB = new Date(b.entry.publishedDate || 0).getTime();
    return dateB - dateA;
  });

  const cookieStore = await cookies();

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Aktuális Szavazások
      </h1>

      {activePolls.length > 0 ? (
        <div className="space-y-8">
          {await Promise.all(activePolls.map(async (poll) => {
            const results = await getPollResults(poll.slug);
            
            // Get user's vote from cookie
            const cookieName = `poll_${poll.slug}`;
            const voteCookie = cookieStore.get(cookieName);
            let userVote: number | null = null;
            
            if (voteCookie) {
                if (voteCookie.value === 'true') {
                    // Legacy cookie support
                    userVote = -1; 
                } else {
                    const parsed = parseInt(voteCookie.value, 10);
                    if (!isNaN(parsed)) {
                        userVote = parsed;
                    }
                }
            }
            
            return (
              <PollCard
                key={poll.slug}
                id={poll.slug}
                question={poll.entry.question}
                options={poll.entry.options}
                initialResults={results}
                userVote={userVote}
                allowChange={poll.entry.allowChange}
              />
            );
          }))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Jelenleg nincs aktív szavazás.
          </h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Kérjük, látogasson vissza később!
          </p>
        </div>
      )}
    </div>
  );
}
