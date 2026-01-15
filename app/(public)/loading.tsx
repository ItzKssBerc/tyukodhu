export default function Loading() {
  // A simple, centered spinner
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-600 dark:border-indigo-400"></div>
    </div>
  );
}
