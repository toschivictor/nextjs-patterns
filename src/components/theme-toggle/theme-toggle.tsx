'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useTheme } from '@/contexts/theme-context';

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
			aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
		>
			{theme === 'light' ? (
				<>
					<MoonIcon className="w-5 h-5" />
					<span>Dark Mode</span>
				</>
			) : (
				<>
					<SunIcon className="w-5 h-5" />
					<span>Light Mode</span>
				</>
			)}
		</button>
	);
}
