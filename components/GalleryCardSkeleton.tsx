export default function GalleryCardSkeleton() {
  return (
    <div className="gallery-item rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800 animate-pulse">
      <div className="w-full h-48 object-cover bg-gray-300 dark:bg-gray-600"></div>
      <div className="p-2">
        <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
        <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
  );
}
