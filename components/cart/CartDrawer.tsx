'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { useCart } from '@/lib/context/CartContext';
import { Button } from '@/components/ui/button';
import { COMPANY_INFO } from '@/lib/constants';
import { getCategoryLabel } from '@/lib/data/products';

export default function CartDrawer() {
    const { isOpen, closeCart, items, removeItem, updateQuantity, itemCount } = useCart();
    const drawerRef = React.useRef<HTMLDivElement>(null);

    // Close on escape key
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeCart();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Prevent scrolling when open
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, closeCart]);

    // Format WhatsApp message with items and quantities
    const whatsappMessage = React.useMemo(() => {
        if (items.length === 0) return '';
        const itemList = items
            .map((item, idx) => `${idx + 1}. ${item.name} - Qty: ${item.quantity}`)
            .join('\n');
        return encodeURIComponent(
            `Hello Ambika Surgicals,\n\nI would like to request an official quote for the following products:\n\n${itemList}\n\nPlease share unit pricing, MOQ, and estimated delivery timeline. Thank you!`
        );
    }, [items]);

    const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}?text=${whatsappMessage}`;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
                        aria-hidden="true"
                    />

                    {/* Drawer */}
                    <motion.div
                        ref={drawerRef}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-[101] flex w-full max-w-md flex-col bg-white shadow-2xl sm:max-w-lg"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="cart-title"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <h2 id="cart-title" className="text-xl font-bold text-navy flex items-center gap-2">
                                <ShoppingCart className="h-5 w-5 text-primary" />
                                Your Quote Request
                                <span className="ml-1 text-sm font-semibold text-gray-500">
                                    ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                                </span>
                            </h2>
                            <button
                                onClick={closeCart}
                                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                                aria-label="Close cart"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto px-6 py-6">
                            {items.length === 0 ? (
                                <div className="flex h-full flex-col items-center justify-center space-y-5 text-center">
                                    <div className="rounded-full bg-primary/10 p-6">
                                        <ShoppingCart className="h-12 w-12 text-primary" />
                                    </div>
                                    <div className="space-y-2 max-w-xs">
                                        <h3 className="text-lg font-bold text-navy">Your Quote Request is Empty</h3>
                                        <p className="text-sm text-gray-500">
                                            Select products from our catalog to request bulk pricing and hospital supply quotes.
                                        </p>
                                    </div>
                                    <Link href="/products" onClick={closeCart}>
                                        <Button className="font-semibold shadow-md">
                                            Explore Product Catalog
                                        </Button>
                                    </Link>

                                    {/* Quick Links */}
                                    <div className="pt-4 border-t border-gray-100 w-full text-xs text-gray-500">
                                        <p className="font-medium text-gray-700 mb-2">Popular Categories:</p>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            <Link
                                                href="/products?category=sterile-non-sterile"
                                                onClick={closeCart}
                                                className="px-3 py-1 bg-gray-100 hover:bg-primary/10 hover:text-primary rounded-full transition-colors"
                                            >
                                                Sterile & Non Sterile
                                            </Link>
                                            <Link
                                                href="/products?category=sterile-dressing"
                                                onClick={closeCart}
                                                className="px-3 py-1 bg-gray-100 hover:bg-primary/10 hover:text-primary rounded-full transition-colors"
                                            >
                                                Sterile Dressing
                                            </Link>
                                            <Link
                                                href="/products?category=bandages"
                                                onClick={closeCart}
                                                className="px-3 py-1 bg-gray-100 hover:bg-primary/10 hover:text-primary rounded-full transition-colors"
                                            >
                                                Bandages
                                            </Link>
                                            <Link
                                                href="/products?category=cotton-products"
                                                onClick={closeCart}
                                                className="px-3 py-1 bg-gray-100 hover:bg-primary/10 hover:text-primary rounded-full transition-colors"
                                            >
                                                Cotton Products
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <ul className="divide-y divide-gray-100">
                                    {items.map((item) => (
                                        <li key={item.id} className="flex py-5 gap-4">
                                            {/* Product Image */}
                                            <Link
                                                href={`/products/${item.slug}`}
                                                onClick={closeCart}
                                                className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 hover:opacity-90 transition-opacity"
                                            >
                                                <Image
                                                    src={item.imageUrl || '/images/placeholder.png'}
                                                    alt={item.name}
                                                    fill
                                                    sizes="80px"
                                                    className="object-cover"
                                                />
                                            </Link>

                                            <div className="flex flex-1 flex-col justify-between">
                                                <div>
                                                    <h3 className="line-clamp-2 font-bold text-navy text-sm hover:text-primary transition-colors">
                                                        {/* Fixed link: was /product/${item.id} (404), now /products/${item.slug} */}
                                                        <Link href={`/products/${item.slug}`} onClick={closeCart}>
                                                            {item.name}
                                                        </Link>
                                                    </h3>
                                                    <span className="text-xs text-gray-500 capitalize mt-0.5 block">
                                                        {getCategoryLabel(item.category)}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between mt-3">
                                                    <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="p-1.5 text-gray-600 hover:bg-gray-200 rounded-l-lg transition-colors disabled:opacity-50"
                                                            disabled={item.quantity <= 1}
                                                            aria-label="Decrease quantity"
                                                        >
                                                            <Minus className="h-3.5 w-3.5" />
                                                        </button>
                                                        <span className="w-8 text-center font-bold text-navy text-xs select-none">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-1.5 text-gray-600 hover:bg-gray-200 rounded-r-lg transition-colors"
                                                            aria-label="Increase quantity"
                                                        >
                                                            <Plus className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(item.id)}
                                                        className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700 transition-colors p-1"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-gray-100 bg-gray-50/80 px-6 py-5 space-y-3">
                                <Link href="/inquiry" onClick={closeCart} className="w-full block">
                                    <Button size="lg" className="w-full text-base font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                                        <span>Proceed to Quote Request</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>

                                {/* 1-Click WhatsApp Quick Quote */}
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-4 rounded-lg font-semibold shadow-sm transition-all duration-200 text-sm"
                                >
                                    <FaWhatsapp className="w-5 h-5 text-white shrink-0" />
                                    <span>Instant Quote via WhatsApp</span>
                                </a>

                                <div className="pt-2 text-center">
                                    <button
                                        type="button"
                                        className="text-xs font-medium text-gray-500 hover:text-navy transition-colors"
                                        onClick={closeCart}
                                    >
                                        or Continue Browsing
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
