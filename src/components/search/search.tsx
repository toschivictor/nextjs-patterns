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
		<div className="border-2 border-gray-300 rounded-md p-4">
			<div className="flex flex-row">
				{!!terms.length &&
					terms.map((term) => (
						<div key={term} className="bg-gray-200 mr-1 p-2 rounded-md">
							<div className="flex flex-row justify-between">
								<div>{term}</div>
								<button
									type="button"
									onClick={() => handleDeleteTerm(term)}
									className="text-red-500 font-bold text-sm px-1"
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
				className="w-full p-2 border-none"
			/>
			<ul>
				{filteredItems.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>
		</div>
	);
}
