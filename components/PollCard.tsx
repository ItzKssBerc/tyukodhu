"use client";

import { useState, useTransition, useEffect } from 'react';
import { vote } from '@/app/actions';
import { Check } from 'lucide-react';

type PollProps = {
  id: string;
  question: string;
  options: string[];
  initialResults?: Record<string, number>;
  userVote?: number | null; // Index of the option user voted for, or null
  allowChange?: boolean;
};

export default function PollCard({ id, question, options, initialResults = {}, userVote = null, allowChange = false }: PollProps) {
  const [isPending, startTransition] = useTransition();
  const [votedOption, setVotedOption] = useState<number | null>(userVote);
  const [results, setResults] = useState(initialResults);
  const [isEditing, setIsEditing] = useState(false); // State to toggle between result view and voting view

  // Update local state if prop changes (e.g. after server revalidation)
  useEffect(() => {
    setVotedOption(userVote);
  }, [userVote]);

  // Update results if initialResults change
  useEffect(() => {
    setResults(initialResults);
  }, [initialResults]);

  const totalVotes = Object.values(results).reduce((a, b) => a + b, 0);
  const hasVoted = votedOption !== null;

  const handleVote = (index: number) => {
    startTransition(async () => {
      // Optimistic update
      const newResults = { ...results };
      
      // If changing vote, decrement old
      if (votedOption !== null) {
          const oldKey = `option:${votedOption}`;
          newResults[oldKey] = Math.max(0, (newResults[oldKey] || 0) - 1);
      }

      // Increment new
      const newKey = `option:${index}`;
      newResults[newKey] = (newResults[newKey] || 0) + 1;
      
      setResults(newResults);
      setVotedOption(index);
      setIsEditing(false);

      const response = await vote(id, index, allowChange);
      if (!response.success) {
        // Revert/Error handling could go here
        console.error(response.message);
      }
    });
  };

  const showResults = hasVoted && !isEditing;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{question}</h3>
      
      <div className="space-y-3">
        {options.map((option, index) => {
          const voteCount = results[`option:${index}`] || 0;
          const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
          const isSelected = votedOption === index;

          return (
            <div key={index} className="relative">
              {showResults ? (
                // Result View
                <div className={`relative h-12 rounded-lg overflow-hidden ${isSelected ? 'ring-2 ring-blue-500 dark:ring-blue-400 ring-offset-1 dark:ring-offset-gray-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                   {/* Background Bar */}
                   {!isSelected && <div className="absolute top-0 left-0 h-full w-full bg-gray-100 dark:bg-gray-700"></div>}
                   
                  <div 
                    className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out ${isSelected ? 'bg-blue-100 dark:bg-blue-900/60' : 'bg-gray-200 dark:bg-gray-600'}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                  
                  <div className="absolute inset-0 flex items-center justify-between px-4">
                    <span className={`font-medium z-10 ${isSelected ? 'text-blue-900 dark:text-blue-100' : 'text-gray-800 dark:text-gray-200'}`}>
                        {option} {isSelected && <span className="ml-2 text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded-full">Te szavazatod</span>}
                    </span>
                    <span className={`font-bold z-10 ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'}`}>
                      {percentage}% ({voteCount})
                    </span>
                  </div>
                </div>
              ) : (
                // Vote Button
                <button
                  onClick={() => handleVote(index)}
                  disabled={isPending}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed
                    ${isSelected 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 ring-1 ring-blue-500 dark:ring-blue-400' 
                        : 'border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-200'
                    }
                  `}
                >
                  <span>{option}</span>
                  {isSelected && <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                </button>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <span>Összes szavazat: {totalVotes}</span>
        
        {hasVoted && allowChange && !isEditing && (
            <button 
                onClick={() => setIsEditing(true)}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
                Szavazat módosítása
            </button>
        )}
        
        {isEditing && (
             <button 
                onClick={() => setIsEditing(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:underline"
            >
                Mégsem
            </button>
        )}
      </div>
    </div>
  );
}
