'use client';

import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>('light');
	const [mounted, setMounted] = useState(false);

	// Initialize theme from localStorage or default to 'light'
	useEffect(() => {
		setMounted(true);
		const savedTheme = localStorage.getItem('theme') as Theme | null;
		if (savedTheme) {
			setTheme(savedTheme);
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setTheme('dark');
		}
	}, []);

	useEffect(() => {
		if (mounted) {
			document.documentElement.classList.remove('light', 'dark');
			document.documentElement.classList.add(theme);
			localStorage.setItem('theme', theme);
		}
	}, [theme, mounted]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	// Always provide the context, but only apply theme class after mount to prevent hydration mismatch
	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
}
