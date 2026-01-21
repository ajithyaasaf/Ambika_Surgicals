'use client';

import Image from 'next/image';
import { X, User, Building2, Mail, Phone, MessageSquare, Package, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { PRODUCTS } from '@/lib/data/products';

interface Submission {
    id: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message?: string;
    status: 'new' | 'read' | 'replied';
    timestamp: any;
    type?: 'contact' | 'quote';
    products?: string[] | Array<{ id: string; quantity: number }>; // Support both formats
}

interface SubmissionDetailsModalProps {
    submission: Submission | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function SubmissionDetailsModal({ submission, isOpen, onClose }: SubmissionDetailsModalProps) {
    if (!isOpen || !submission) return null;

    const formattedDate = submission.timestamp
        ? format(new Date(submission.timestamp), 'PPP p')
        : 'Unknown date';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-navy to-blue-900 text-white p-6 rounded-t-2xl flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${submission.type === 'quote'
                                ? 'bg-purple-500/20 text-purple-100'
                                : 'bg-blue-500/20 text-blue-100'
                                }`}>
                                {submission.type === 'quote' ? 'Quote Request' : 'General Inquiry'}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${submission.status === 'new'
                                ? 'bg-orange-500/20 text-orange-100'
                                : 'bg-green-500/20 text-green-100'
                                }`}>
                                {submission.status}
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold">Submission Details</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Customer Info */}
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                        <h3 className="font-bold text-navy text-lg mb-3 flex items-center gap-2">
                            <User className="w-5 h-5 text-primary" />
                            Customer Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex items-start gap-3">
                                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Name</div>
                                    <div className="font-semibold text-navy">{submission.name}</div>
                                </div>
                            </div>

                            {submission.company && (
                                <div className="flex items-start gap-3">
                                    <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Company</div>
                                        <div className="font-semibold text-navy">{submission.company}</div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Email</div>
                                    <a href={`mailto:${submission.email}`} className="font-semibold text-primary hover:underline">
                                        {submission.email}
                                    </a>
                                </div>
                            </div>

                            {submission.phone && (
                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Phone</div>
                                        <a href={`tel:${submission.phone}`} className="font-semibold text-navy hover:underline">
                                            {submission.phone}
                                        </a>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start gap-3 col-span-full">
                                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Submitted On</div>
                                    <div className="font-semibold text-navy">{formattedDate}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    {submission.message && (
                        <div className="bg-blue-50 rounded-xl p-4">
                            <h3 className="font-bold text-navy text-lg mb-3 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-primary" />
                                Message
                            </h3>
                            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                {submission.message}
                            </p>
                        </div>
                    )}

                    {/* Products (if quote request) */}
                    {submission.type === 'quote' && submission.products && submission.products.length > 0 && (
                        <div className="bg-purple-50 rounded-xl p-4">
                            <h3 className="font-bold text-navy text-lg mb-3 flex items-center gap-2">
                                <Package className="w-5 h-5 text-purple-600" />
                                Requested Products ({submission.products.length})
                            </h3>
                            <ul className="space-y-3">
                                {submission.products.map((item, index) => {
                                    // Handle both old format (string) and new format (object with quantity)
                                    const productId = typeof item === 'string' ? item : item.id;
                                    const quantity = typeof item === 'string' ? 1 : item.quantity;
                                    const product = PRODUCTS.find(p => p.id === productId);

                                    return (
                                        <li key={index} className="flex items-center gap-4 bg-white p-4 rounded-lg border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                                            {/* Product Image */}
                                            <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                                {product?.imageUrl ? (
                                                    <Image
                                                        src={product.imageUrl}
                                                        alt={product.name}
                                                        fill
                                                        sizes="64px"
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Package className="w-8 h-8 text-gray-400" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="font-bold text-navy text-base mb-1">
                                                    {product?.name || productId.replace(/-/g, ' ')}
                                                </div>
                                                {product?.shortDescription && (
                                                    <p className="text-xs text-gray-600 mb-1 line-clamp-1">
                                                        {product.shortDescription}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                                    <span>ID: {productId}</span>
                                                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-semibold">
                                                        Qty: {quantity}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Index Badge */}
                                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-sm shrink-0">
                                                {index + 1}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 p-4 rounded-b-2xl flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => window.location.href = `mailto:${submission.email}`}
                    >
                        <Mail className="w-4 h-4 mr-2" />
                        Reply via Email
                    </Button>
                </div>
            </div>
        </div>
    );
}
