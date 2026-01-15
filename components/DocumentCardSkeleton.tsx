export default function DocumentCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md flex flex-col">
      <div className="p-6 flex-grow animate-pulse">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="flex-grow w-full">
            <div className="w-1/3 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            <div className="w-full h-6 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
            <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm animate-pulse">
        <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="w-1/4 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
  );
}
