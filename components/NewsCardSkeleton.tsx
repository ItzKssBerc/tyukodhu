export default function NewsCardSkeleton() {
  return (
    <div className="group rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm h-full flex flex-col overflow-hidden animate-pulse">
      <div className="relative w-full bg-gray-300 dark:bg-gray-600" style={{ paddingTop: '75%' }}></div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
        </div>
        <div className="flex-grow">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
}
