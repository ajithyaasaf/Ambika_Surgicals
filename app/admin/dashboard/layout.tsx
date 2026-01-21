import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (!session) {
        redirect('/admin/login');
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Admin Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard" className="text-xl font-bold text-navy">
                            Ambika Admin
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/" target="_blank" className="text-sm text-gray-500 hover:text-navy">
                            View Website
                        </Link>
                        <form action="/admin/actions/logout" method="POST">
                            {/* Creating a server action just for logout button usually cleaner in a client component but this works for simple cases if we use the server action directly or we can just link to api */}
                            {/* Actually we defined a logout action in actions.ts, let's use a client button or just a form */}
                            <button type="submit" formAction={async () => {
                                'use server';
                                const { logout } = await import('../actions');
                                await logout();
                            }} className="text-sm text-red-600 font-medium hover:text-red-700">
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
