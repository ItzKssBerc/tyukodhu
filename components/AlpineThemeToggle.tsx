"use client";

const AlpineThemeToggle = () => {
  const buttonHtml = `
    <div x-data>
      <button
        type="button"
        @click="$store.theme.toggle()"
        class="relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        :class="$store.theme.darkMode ? 'bg-gray-700' : 'bg-gray-200'"
      >
        <span class="sr-only">Dark mode toggle</span>
        <span
          class="pointer-events-none relative inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition-duration-200 ease-in-out"
          :class="$store.theme.darkMode ? 'translate-x-5' : 'translate-x-0'"
        >
          <span
            class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
            :class="$store.theme.darkMode ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in'"
            aria-hidden="true"
          >
            <i class="bi bi-sun-fill text-yellow-500 text-sm"></i>
          </span>
          <span
            class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
            :class="$store.theme.darkMode ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out'"
            aria-hidden="true"
          >
            <i class="bi bi-moon-stars-fill text-gray-700 text-sm"></i>
          </span>
        </span>
      </button>
    </div>
  `;

  return <div dangerouslySetInnerHTML={{ __html: buttonHtml }} />;
};

export default AlpineThemeToggle;
