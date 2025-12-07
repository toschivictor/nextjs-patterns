'use client';

import type React from 'react';
import { useMemo, useState } from 'react';

export function Search() {
	const [searchTerm, setSearchTerm] = useState('');
	const [items] = useState<string[]>([
		'Apple',
		'Banana',
		'Orange',
		'Mango',
		'Pineapple',
		'Grapes',
	]);
	const [terms, setTerms] = useState<string[]>([]);

	const filteredItems = useMemo(
		() =>
			items.filter((item) =>
				item.toLowerCase().includes(searchTerm.toLowerCase()),
			),
		[items, searchTerm],
	);

	const handleDeleteTerm = (term: string) => {
		setTerms(terms.filter((t) => t !== term));
	};

	const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setTerms([...terms, searchTerm]);
			setSearchTerm('');
		}
	};

	return (
		<div className="border-2 border-gray-300 dark:border-gray-600 rounded-md p-4 bg-white dark:bg-gray-800">
			<div className="flex flex-row">
				{!!terms.length &&
					terms.map((term) => (
						<div
							key={term}
							className="bg-gray-200 dark:bg-gray-700 mr-1 p-2 rounded-md"
						>
							<div className="flex flex-row justify-between">
								<div className="text-gray-800 dark:text-gray-200">{term}</div>
								<button
									type="button"
									onClick={() => handleDeleteTerm(term)}
									className="text-red-500 dark:text-red-400 font-bold text-sm px-1"
								>
									x
								</button>
							</div>
						</div>
					))}
			</div>
			<input
				type="text"
				placeholder="Search..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				onKeyDown={handleSearch}
				className="w-full p-2 border-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
			/>
			<ul className="mt-2">
				{filteredItems.map((item) => (
					<li
						key={item}
						className="text-gray-800 dark:text-gray-200 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 rounded"
					>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
}
