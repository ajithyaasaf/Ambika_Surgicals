import { Users, Mail, FileText, TrendingUp } from 'lucide-react';

interface StatsProps {
    total: number;
    unread: number;
    quotes: number;
}

export default function StatsCards({ total, unread, quotes }: StatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Inquiries */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                <div className="relative">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                            <Users className="w-6 h-6" />
                        </div>
                        <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            <TrendingUp className="w-3 h-3 mr-1" /> +12%
                        </span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Inquiries</p>
                        <h3 className="text-3xl font-bold text-navy">{total}</h3>
                    </div>
                </div>
            </div>

            {/* Unread Messages */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                <div className="relative">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
                            <Mail className="w-6 h-6" />
                        </div>
                        {unread > 0 && (
                            <span className="flex items-center text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-full animate-pulse">
                                Action Needed
                            </span>
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">New Messages</p>
                        <h3 className="text-3xl font-bold text-navy">{unread}</h3>
                    </div>
                </div>
            </div>

            {/* Quote Requests */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                <div className="relative">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                            <FileText className="w-6 h-6" />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Quote Requests</p>
                        <h3 className="text-3xl font-bold text-navy">{quotes}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
