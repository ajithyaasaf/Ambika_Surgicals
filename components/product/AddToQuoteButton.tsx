'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/data/products';
import { useCart } from '@/lib/context/CartContext';
import { Check, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddToQuoteButtonProps {
    product: Product;
    className?: string;
}

export function AddToQuoteButton({ product, className }: AddToQuoteButtonProps) {
    const { addItem, items, updateQuantity, openCart } = useCart();
    const [justAdded, setJustAdded] = React.useState(false);

    // Check if product is already in cart
    const cartItem = items.find(item => item.id === product.id);
    const isInCart = Boolean(cartItem);
    const quantity = cartItem?.quantity || 0;

    const handleAdd = () => {
        addItem(product);
        setJustAdded(true);

        // Reset the "just added" state after 2 seconds
        setTimeout(() => {
            setJustAdded(false);
        }, 2000);
    };

    if (isInCart) {
        return (
            <div className={cn("space-y-3", className)}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    {/* Quantity Stepper */}
                    <div className="flex items-center justify-between border-2 border-primary/20 bg-primary/5 rounded-xl p-1.5 min-w-[160px]">
                        <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-white text-primary hover:bg-primary hover:text-white shadow-sm transition-colors"
                            aria-label="Decrease quantity"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-bold text-navy px-3 select-none">
                            {quantity} in Quote
                        </span>
                        <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-primary-dark shadow-sm transition-colors"
                            aria-label="Increase quantity"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Proceed to Quote CTA */}
                    <Link href="/inquiry" className="flex-1">
                        <Button
                            size="lg"
                            className="w-full bg-primary hover:bg-primary-dark text-white font-bold shadow-lg shadow-primary/20"
                        >
                            <span>Proceed to Quote</span>
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>

                    {/* View Cart Drawer Button */}
                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={openCart}
                        className="border-gray-300 hover:border-navy hover:text-navy"
                        aria-label="View Quote Cart"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </Button>
                </div>

                <p className="text-xs text-green-700 font-medium flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                    Added to your Quote Request list. You can adjust quantity above or proceed to submit.
                </p>
            </div>
        );
    }

    return (
        <Button
            onClick={handleAdd}
            size="lg"
            className={className}
            disabled={justAdded}
        >
            {justAdded ? (
                <>
                    <Check className="w-5 h-5 mr-2 text-white" />
                    Added to Quote Request!
                </>
            ) : (
                <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Quote Request
                </>
            )}
        </Button>
    );
}
