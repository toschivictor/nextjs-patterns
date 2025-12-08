import { DashboardSidebar } from '@/components/dashboard-sidebar/dashboard-sidebar';
import { Search } from '@/components/search/search';

export default function Dashboard() {
	return (
		<div className="flex min-h-screen bg-white dark:bg-gray-900 transition-colors">
			<DashboardSidebar />
			<main className="w-5/6 p-4">
				<Search />
			</main>
		</div>
	);
}
