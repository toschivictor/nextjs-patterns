import {
	ArrowsUpDownIcon,
	BanknotesIcon,
	ChartBarIcon,
	HomeIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { Search } from '@/components/search/search';

export default function Dashboard() {
	return (
		<div className="flex">
			<aside className="w-1/6 bg-blue-500">
				<h1 className="text-2xl font-bold p-4 text-white">Dashboard</h1>
				<nav>
					<ul>
						<li>
							<Link
								href="/dashboard"
								className="flex items-center gap-2 text-white"
							>
								<HomeIcon className="w-4 h-4" />
								Home
							</Link>
						</li>
						<li>
							<Link
								href="/dashboard/transactions"
								className="flex items-center gap-2 text-white"
							>
								<ArrowsUpDownIcon className="w-4 h-4" />
								Transactions
							</Link>
						</li>
						<li>
							<Link
								href="/dashboard/budgets"
								className="flex items-center gap-2 text-white"
							>
								<ChartBarIcon className="w-4 h-4" />
								Budgets
							</Link>
						</li>
						<li>
							<Link
								href="/dashboard/recurring-bills"
								className="flex items-center gap-2 text-white"
							>
								<BanknotesIcon className="w-4 h-4" />
								Recurring Bills
							</Link>
						</li>
					</ul>
				</nav>
			</aside>
			<main className="w-5/6">
				<Search />
			</main>
		</div>
	);
}
