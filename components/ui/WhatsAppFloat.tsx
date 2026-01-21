'use client';

import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/constants';

// WhatsApp Brand Icon (SVG)
const WhatsAppIcon = () => (
    <svg
        viewBox="0 0 24 24"
        className="w-8 h-8 fill-current"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12.0117 0C5.40243 0 0.0214844 5.37155 0.0214844 11.9798C0.0214844 14.6186 0.880525 17.0673 2.37367 19.0664L0 23.9922L5.05389 22.0306C6.96024 23.2723 9.38724 23.9606 12.0097 23.9606H12.0157C18.618 23.9586 23.9961 18.588 23.9961 11.9818C23.9941 8.78363 22.7486 5.77663 20.4859 3.5159C18.2253 1.25316 15.2153 0.00508594 12.0117 0ZM12.0137 21.9427C9.84592 21.9427 7.74714 21.3651 5.92383 20.282L5.49122 20.0249L2.94922 21.0117L3.9237 18.5255L3.63945 18.0735C2.45712 16.1921 1.83407 14.1311 1.83507 11.9798C1.83507 6.37684 6.40274 1.81597 12.0157 1.81597C14.7317 1.81697 17.2847 2.87532 19.2045 4.79307C21.1243 6.71182 22.1812 9.26282 22.1802 11.9818C22.1792 17.5898 17.6185 22.1477 12.0137 22.1477V21.9427H12.0137Z" />
        <path d="M18.4237 14.6402C18.0728 14.4646 16.3506 13.6187 16.0306 13.5015C15.7096 13.3843 15.4756 13.3252 15.2416 13.6761C15.0076 14.028 14.3415 14.8105 14.1395 15.0445C13.9365 15.2785 13.7335 15.3085 13.3825 15.1329C13.0315 14.9563 11.9015 14.5861 10.5615 13.3912C9.51851 12.4611 8.8145 11.3129 8.60949 10.962C8.4045 10.6091 8.5875 10.4201 8.7635 10.2451C8.92151 10.0881 9.11551 9.8351 9.29051 9.63009C9.46651 9.42509 9.52451 9.27909 9.64151 9.04408C9.75852 8.80908 9.69951 8.60507 9.61251 8.42907C9.52451 8.25307 8.8235 6.52702 8.5305 5.82399C8.24649 5.13997 7.95749 5.23397 7.74049 5.22297C7.53649 5.21297 7.30248 5.21297 7.06848 5.21297C6.83448 5.21297 6.45448 5.30097 6.13247 5.65198C5.81147 6.00298 4.90446 6.852 4.90446 8.57904C4.90446 10.3061 6.16149 11.9741 6.33749 12.2091C6.51249 12.4431 8.78855 15.9322 12.4176 17.3683C15.8757 18.7363 15.8757 18.2723 16.5187 18.2133C17.1617 18.1543 18.5907 17.3643 18.8837 16.5433C19.1767 15.7233 19.1767 15.0202 19.0887 14.8732C19.0007 14.7272 18.7747 14.6402 18.4237 14.6402Z" />
    </svg>
);

export default function WhatsAppFloat() {
    // Determine the WhatsApp URL
    // Use the comprehensive API that works on both mobile and desktop
    const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}?text=${encodeURIComponent("Hello Ambika Surgicals, I would like to inquire about your products.")}`;

    return (
        <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Chat on WhatsApp"
        >
            {/* Tooltip Label */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-navy font-semibold text-sm px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Chat with us
            </span>

            {/* Button */}
            <div className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 rounded-full shadow-lg shadow-green-900/20 transition-all duration-300 transform group-hover:scale-110 flex items-center justify-center">
                <WhatsAppIcon />
            </div>

            {/* Ping Animation */}
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
        </Link>
    );
}
