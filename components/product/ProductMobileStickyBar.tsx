'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/data/products';
import { useCart } from '@/lib/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check, Minus, Plus, ArrowRight } from 'lucide-react';

interface ProductMobileStickyBarProps {
    product: Product;
}

export default function ProductMobileStickyBar({ product }: ProductMobileStickyBarProps) {
    const { items, addItem, updateQuantity } = useCart();
    const [justAdded, setJustAdded] = React.useState(false);

    const cartItem = items.find(item => item.id === product.id);
    const isInCart = Boolean(cartItem);
    const quantity = cartItem?.quantity || 0;

    const handleAdd = () => {
        addItem(product);
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 2000);
    };

    return (
        <aside
            aria-label="Product quick action bar"
            className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
        >
            <div className="flex items-center justify-between gap-2.5 max-w-lg mx-auto">
                {/* Product Thumbnail & Title */}
                <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div className="relative w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-navy truncate leading-tight">
                            {product.name}
                        </h4>
                        <p className="text-[10px] text-gray-500 truncate">
                            ISO 13485 • Pure Cotton
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                    {isInCart ? (
                        <div className="flex items-center gap-1.5">
                            {/* Stepper */}
                            <div className="flex items-center border border-primary/30 bg-primary/5 rounded-lg p-0.5 h-9">
                                <button
                                    type="button"
                                    onClick={() => updateQuantity(product.id, quantity - 1)}
                                    className="w-7 h-7 flex items-center justify-center rounded bg-white text-primary shadow-xs active:scale-95 transition-transform"
                                    aria-label="Decrease quantity"
                                >
                                    <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-xs font-bold text-navy px-2 select-none min-w-[1.75rem] text-center">
                                    {quantity}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => updateQuantity(product.id, quantity + 1)}
                                    className="w-7 h-7 flex items-center justify-center rounded bg-primary text-white shadow-xs active:scale-95 transition-transform"
                                    aria-label="Increase quantity"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            {/* Proceed to Quote */}
                            <Link href="/inquiry">
                                <Button
                                    size="sm"
                                    className="h-9 px-3 text-xs font-bold bg-primary hover:bg-primary-dark text-white shadow-xs"
                                >
                                    <span>Quote</span>
                                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Button
                            onClick={handleAdd}
                            size="sm"
                            className="h-9 px-3.5 text-xs font-bold bg-primary hover:bg-primary-dark text-white shadow-sm"
                            disabled={justAdded}
                        >
                            {justAdded ? (
                                <>
                                    <Check className="w-3.5 h-3.5 mr-1" />
                                    Added
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                                    Add to Quote
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </aside>
    );
}
