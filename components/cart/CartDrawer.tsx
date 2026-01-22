'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
                            <h2 id="cart-title" className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <ShoppingCart className="h-5 w-5" />
                                Your Quote Cart
                                <span className="ml-2 text-sm font-normal text-gray-500">
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
                                <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                                    <div className="rounded-full bg-gray-50 p-6">
                                        <ShoppingCart className="h-12 w-12 text-gray-300" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-semibold text-gray-900">Your cart is empty</h3>
                                        <p className="text-gray-500">Add items to request a quote.</p>
                                    </div>
                                    <Button onClick={closeCart} variant="outline" className="mt-4">
                                        Continue Browsing
                                    </Button>
                                </div>
                            ) : (
                                <ul className="divide-y divide-gray-100">
                                    {items.map((item) => (
                                        <li key={item.id} className="flex py-6">
                                            {/* Product Image */}
                                            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                                                {/* Fallback image logic or real image */}
                                                <Image
                                                    src={item.imageUrl || '/images/placeholder.png'}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3 className="line-clamp-2">
                                                            <Link href={`/product/${item.id}`} onClick={closeCart}>
                                                                {item.name}
                                                            </Link>
                                                        </h3>
                                                    </div>
                                                    {/* Optional: Add category or other details if available */}
                                                </div>

                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <div className="flex items-center rounded-md border border-gray-200">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                                                            disabled={item.quantity <= 1}
                                                            aria-label="Decrease quantity"
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </button>
                                                        <span className="w-8 text-center font-medium text-gray-900">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                                            aria-label="Increase quantity"
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </button>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(item.id)}
                                                        className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
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
                            <div className="border-t border-gray-100 bg-gray-50 px-6 py-6">
                                <Link href="/inquiry" onClick={closeCart} className="w-full">
                                    <Button size="lg" className="w-full text-base font-semibold shadow-lg">
                                        Proceed to Quote Request
                                    </Button>
                                </Link>
                                <div className="mt-4 flex justify-center">
                                    <button
                                        type="button"
                                        className="text-sm font-medium text-gray-500 hover:text-gray-700"
                                        onClick={closeCart}
                                    >
                                        or Continue Shopping
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
