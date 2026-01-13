"use client";

import React from "react";

export default function MapPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg shadow-indigo-100/50 dark:shadow-none overflow-hidden border border-indigo-50 dark:border-gray-700">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-900 dark:to-indigo-800 px-6 py-6">
          <h1 className="text-xl font-bold text-white tracking-tight">
            Tyukod digitális térképe
          </h1>
          <p className="text-indigo-100 text-sm opacity-90">
            Helyi intézmények, üzletek és közösségi terek
          </p>
        </div>

        <div className="p-4">
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            A térkép funkcionalitás eltávolítva.
          </div>
        </div>
      </div>
    </div>
  );
}
