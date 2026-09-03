'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';

export default function MobileQuoteBar() {
    const { itemCount, openCart } = useCart();
    const pathname = usePathname();

    // Do not show on the inquiry/quote page, if cart is empty, or on product detail pages (which have dedicated sticky bar)
    const isProductDetail = pathname ? pathname.startsWith('/products/') && pathname !== '/products' : false;
    if (itemCount === 0 || pathname === '/inquiry' || isProductDetail) {
        return null;
    }

    return (
        <aside
            aria-label="Quote request summary"
            className="fixed bottom-5 left-3 right-20 z-40 md:hidden animate-in slide-in-from-bottom-4 duration-300 pointer-events-auto"
        >
            <div className="bg-navy/95 backdrop-blur-md text-white border border-white/15 rounded-full shadow-2xl px-3.5 py-2 flex items-center justify-between gap-2">
                {/* Cart Info / Open Cart Drawer */}
                <button
                    onClick={openCart}
                    className="flex items-center gap-2.5 text-left py-0.5 focus:outline-hidden"
                    aria-label={`Open quote cart with ${itemCount} items`}
                >
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-primary-light">
                        <ShoppingCart className="w-4 h-4" />
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-xs">
                            {itemCount}
                        </span>
                    </div>
                    <div className="leading-tight">
                        <p className="text-xs font-bold text-white">
                            {itemCount} {itemCount === 1 ? 'Item' : 'Items'} in Quote
                        </p>
                        <p className="text-[10px] text-gray-300 underline">Tap to view list</p>
                    </div>
                </button>

                {/* Quick Proceed Button */}
                <Link
                    href="/inquiry"
                    className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm transition-transform active:scale-95 shrink-0"
                >
                    <span>Request Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>
        </aside>
    );
}
