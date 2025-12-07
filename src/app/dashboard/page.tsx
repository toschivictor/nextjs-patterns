import {
	ArrowsUpDownIcon,
	BanknotesIcon,
	ChartBarIcon,
	HomeIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { Search } from '@/components/search/search';
import { ThemeToggle } from '@/components/theme-toggle/theme-toggle';

export default function Dashboard() {
	return (
		<div className="flex min-h-screen bg-white dark:bg-gray-900 transition-colors">
			<aside className="w-1/6 bg-blue-500 dark:bg-blue-700">
				<div className="flex items-center justify-between p-4">
					<h1 className="text-2xl font-bold text-white">Dashboard</h1>
					<ThemeToggle />
				</div>
				<nav>
					<ul>
						<li>
							<Link
								href="/dashboard"
								className="flex items-center gap-2 text-white p-2 hover:bg-blue-600 dark:hover:bg-blue-800"
							>
								<HomeIcon className="w-4 h-4" />
								Home
							</Link>
						</li>
						<li>
							<Link
								href="/dashboard/transactions"
								className="flex items-center gap-2 text-white p-2 hover:bg-blue-600 dark:hover:bg-blue-800"
							>
								<ArrowsUpDownIcon className="w-4 h-4" />
								Transactions
							</Link>
						</li>
						<li>
							<Link
								href="/dashboard/budgets"
								className="flex items-center gap-2 text-white p-2 hover:bg-blue-600 dark:hover:bg-blue-800"
							>
								<ChartBarIcon className="w-4 h-4" />
								Budgets
							</Link>
						</li>
						<li>
							<Link
								href="/dashboard/recurring-bills"
								className="flex items-center gap-2 text-white p-2 hover:bg-blue-600 dark:hover:bg-blue-800"
							>
								<BanknotesIcon className="w-4 h-4" />
								Recurring Bills
							</Link>
						</li>
					</ul>
				</nav>
			</aside>
			<main className="w-5/6 p-4">
				<Search />
			</main>
		</div>
	);
}
