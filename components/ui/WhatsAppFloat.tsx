'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaWhatsapp } from 'react-icons/fa6';
import { COMPANY_INFO } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function WhatsAppFloat() {
    const pathname = usePathname();
    const isProductDetail = pathname ? pathname.startsWith('/products/') && pathname !== '/products' : false;

    // Determine the WhatsApp URL
    // Use the comprehensive API that works on both mobile and desktop
    const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}?text=${encodeURIComponent("Hello Ambika Surgicals, I would like to inquire about your products.")}`;

    return (
        <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "fixed right-5 md:right-6 z-50 group transition-all duration-300",
                isProductDetail ? "bottom-20 md:bottom-6" : "bottom-6"
            )}
            aria-label="Chat on WhatsApp"
        >
            {/* Tooltip Label */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-navy font-semibold text-sm px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Chat with us
            </span>

            {/* Button */}
            <div className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 rounded-full shadow-lg shadow-green-900/20 transition-all duration-300 transform group-hover:scale-110 flex items-center justify-center">
                <FaWhatsapp className="w-8 h-8 text-white" />
            </div>

            {/* Ping Animation */}
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
        </Link>
    );
}
