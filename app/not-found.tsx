import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.24))] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-16">
      <h1 className="text-6xl md:text-8xl font-extrabold text-red-600 dark:text-red-500 mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-6">
        A keresett oldal nem található.
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-8 max-w-md">
        Úgy tűnik, elvesztél. Ne aggódj, segítünk visszatalálni!
      </p>
      <Link href="/" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
        Vissza a főoldalra
      </Link>
    </div>
  );
}
