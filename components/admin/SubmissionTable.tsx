'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Search, Mail, Trash2, CheckCircle, ExternalLink, RefreshCw, MessageCircle, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { markAsRead, deleteSubmission } from '@/app/admin/actions';
import ConfirmModal from './ConfirmModal';
import SubmissionDetailsModal from './SubmissionDetailsModal';
import { exportToExcel } from '@/lib/utils/exportToExcel';

interface Submission {
    id: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message?: string;
    status: 'new' | 'read' | 'replied';
    timestamp: any; // Date or timestamp string
    type?: 'contact' | 'quote';
    products?: string[] | Array<{ id: string; quantity: number }>; // Support both formats
}

export default function SubmissionTable({ initialSubmissions }: { initialSubmissions: Submission[] }) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [submissionToDelete, setSubmissionToDelete] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);

    // Filter submissions based on search
    const filteredSubmissions = initialSubmissions.filter(sub =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.company?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate pagination
    const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedSubmissions = filteredSubmissions.slice(startIndex, endIndex);

    // Reset to page 1 when search changes
    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    async function handleMarkRead(id: string) {
        setLoadingId(id);
        await markAsRead(id);
        router.refresh();
        setLoadingId(null);
    }

    function openDeleteModal(id: string) {
        setSubmissionToDelete(id);
        setDeleteModalOpen(true);
    }

    async function confirmDelete() {
        if (!submissionToDelete) return;

        setLoadingId(submissionToDelete);
        try {
            const result = await deleteSubmission(submissionToDelete);
            if (result.error) {
                alert('Error: ' + result.error);
            } else {
                setDeleteModalOpen(false);
                router.refresh();
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete submission. Please try again.');
        } finally {
            setLoadingId(null);
            setSubmissionToDelete(null);
        }
    }

    function openDetailsModal(submission: Submission) {
        setSelectedSubmission(submission);
        setDetailsModalOpen(true);
    }

    // Auto-refresh periodically (optional, simplistic approach)
    // useEffect(() => {
    //      const interval = setInterval(() => router.refresh(), 30000);
    //      return () => clearInterval(interval);
    // }, [router]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header / Filter */}
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Search by name, email, or company..."
                        className="pl-9 bg-white"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportToExcel(filteredSubmissions)}
                        className="gap-2 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                    >
                        <Download className="w-4 h-4" /> Export to Excel
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => router.refresh()} className="gap-2">
                        <RefreshCw className="w-4 h-4" /> Refresh
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold">
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Contact Info</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Message</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {paginatedSubmissions.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                    No submissions found.
                                </td>
                            </tr>
                        ) : (
                            paginatedSubmissions.map((sub) => (
                                <tr
                                    key={sub.id}
                                    onClick={() => openDetailsModal(sub)}
                                    className="hover:bg-blue-50/50 transition-colors group cursor-pointer"
                                >
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${sub.status === 'new' ? 'bg-blue-100 text-blue-800' :
                                                sub.status === 'read' ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'}`}>
                                            {sub.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                        {format(new Date(sub.timestamp), 'MMM d, yyyy')}
                                        <br />
                                        <span className="text-xs text-gray-400">
                                            {format(new Date(sub.timestamp), 'h:mm a')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-navy">{sub.name}</div>
                                        <div className="text-sm text-gray-500">{sub.email}</div>
                                        {sub.company && (
                                            <div className="text-sm text-gray-500 font-medium mt-0.5 flex items-center gap-1">
                                                🏢 {sub.company}
                                            </div>
                                        )}
                                        {sub.phone && (
                                            <div className="text-xs text-gray-400 mt-0.5">📞 {sub.phone}</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-medium px-2 py-1 rounded border
                                            ${sub.type === 'quote' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                                            {sub.type === 'quote' ? 'Quote Req' : 'General'}
                                        </span>
                                        {sub.products && sub.products.length > 0 && (
                                            <div className="text-xs text-gray-500 mt-1">
                                                {sub.products.length} Items
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 max-w-xs">
                                        <div className="text-sm text-gray-600 line-clamp-2" title={sub.message}>
                                            {sub.message || '-'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                            {sub.status === 'new' && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleMarkRead(sub.id)}
                                                    disabled={loadingId === sub.id}
                                                    title="Mark as Read"
                                                    className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                </Button>
                                            )}
                                            <a href={`mailto:${sub.email}`} title="Reply via Email" className="h-8 w-8 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100">
                                                <Mail className="w-4 h-4" />
                                            </a>
                                            {sub.phone && (
                                                <a
                                                    href={`https://wa.me/${sub.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${sub.name}, thank you for contacting Ambika Surgicals. How can we assist you today?`)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title="Message on WhatsApp"
                                                    className="h-8 w-8 inline-flex items-center justify-center rounded-md text-green-600 hover:text-green-700 hover:bg-green-50"
                                                >
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                                    </svg>
                                                </a>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openDeleteModal(sub.id)}
                                                disabled={loadingId === sub.id}
                                                title="Delete"
                                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredSubmissions.length)} of {filteredSubmissions.length} submissions
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <div className="flex items-center gap-2 px-3">
                            <span className="text-sm text-gray-600">
                                Page {currentPage} of {totalPages}
                            </span>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}

            <ConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Submission"
                message="Are you sure you want to delete this submission? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                isLoading={loadingId === submissionToDelete}
            />

            <SubmissionDetailsModal
                submission={selectedSubmission}
                isOpen={detailsModalOpen}
                onClose={() => setDetailsModalOpen(false)}
            />
        </div>
    );
}
