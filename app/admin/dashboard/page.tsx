import { db } from '@/lib/firebase/config';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import SubmissionTable from '@/components/admin/SubmissionTable';
import StatsCards from '@/components/admin/StatsCards';

// Force dynamic rendering to ensure fresh data on each request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getSubmissions() {
    try {
        const q = query(
            collection(db, 'contact_submissions'),
            orderBy('timestamp', 'desc'),
            limit(100) // Fetched more for better stats
        );

        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                // Serialize timestamp to string/number for client component
                timestamp: data.timestamp?.toDate ? data.timestamp.toDate().toISOString() : new Date().toISOString(),
            };
        });
    } catch (error) {
        console.error('Error fetching submissions:', error);
        return [];
    }
}

export default async function DashboardPage() {
    const submissions = await getSubmissions();

    // Calculate Stats
    const total = submissions.length;
    const unread = submissions.filter((s: any) => s.status === 'new').length;
    const quotes = submissions.filter((s: any) => s.type === 'quote').length;

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-gray-100 pb-6">
                <div>
                    <span className="text-sm font-medium text-gray-500 mb-1 block">Overview</span>
                    <h1 className="text-3xl font-bold text-navy font-heading">
                        Dashboard
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Good Afternoon, Welcome back to your admin portal.
                    </p>
                </div>
            </div>

            {/* Stats Overview */}
            <StatsCards total={total} unread={unread} quotes={quotes} />

            {/* Main Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1">
                <SubmissionTable initialSubmissions={submissions as any} />
            </div>
        </div>
    );
}
