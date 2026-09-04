'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, getCategoryLabel } from '@/lib/data/products';
import { Button, buttonVariants } from '@/components/ui/button';
import { useCart } from '@/lib/context/CartContext';
import { Check, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addItem, items, updateQuantity, openCart } = useCart();
    const [justAdded, setJustAdded] = React.useState(false);

    // Check if product is already in cart
    const cartItem = items.find(item => item.id === product.id);
    const isInCart = Boolean(cartItem);
    const quantity = cartItem?.quantity || 0;

    const handleAdd = () => {
        addItem(product);
        setJustAdded(true);

        // Reset after 2 seconds
        setTimeout(() => {
            setJustAdded(false);
        }, 2000);
    };

    return (
        <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden">
            {/* Image Area */}
            <Link href={`/products/${product.slug}`} className="block relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Category Badge */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
                    <span className="bg-white/90 backdrop-blur text-navy text-[9px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-full uppercase tracking-wider shadow-xs">
                        {getCategoryLabel(product.category)}
                    </span>
                </div>

                {/* In-Quote Badge */}
                {isInCart && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 animate-in fade-in zoom-in-95 duration-200">
                        <span className="bg-primary text-white text-[9px] sm:text-[11px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-md flex items-center gap-1">
                            <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            <span className="hidden xs:inline">In Quote</span> ({quantity})
                        </span>
                    </div>
                )}
            </Link>

            <div className="p-3 sm:p-5 flex flex-col flex-grow">
                <Link href={`/products/${product.slug}`}>
                    <h3 className="text-xs sm:text-base font-bold text-navy font-heading hover:text-primary transition-colors mb-1 sm:mb-2 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-[11px] sm:text-xs text-gray-500 mb-2 sm:mb-3 flex-grow line-clamp-1 sm:line-clamp-2">
                    {product.shortDescription}
                </p>

                <div className="mt-auto">
                    {isInCart ? (
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            {/* Quantity Stepper */}
                            <div className="flex-1 flex items-center justify-between border border-primary/30 bg-primary/5 rounded-lg p-0.5 sm:p-1 h-8 sm:h-9">
                                <button
                                    onClick={() => updateQuantity(product.id, quantity - 1)}
                                    className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded bg-white text-primary hover:bg-primary hover:text-white shadow-xs transition-colors shrink-0"
                                    aria-label="Decrease quantity"
                                >
                                    <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                </button>
                                <button
                                    onClick={openCart}
                                    className="text-[10px] sm:text-xs font-bold text-navy px-1 hover:underline select-none truncate"
                                    title="View Quote List"
                                >
                                    {quantity} in Quote
                                </button>
                                <button
                                    onClick={() => updateQuantity(product.id, quantity + 1)}
                                    className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded bg-primary text-white hover:bg-primary-dark shadow-xs transition-colors shrink-0"
                                    aria-label="Increase quantity"
                                >
                                    <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                </button>
                            </div>

                            {/* View Quote Button (visible on tablet/desktop) */}
                            <Button
                                onClick={openCart}
                                size="sm"
                                className="hidden sm:inline-flex bg-navy hover:bg-navy-light text-white text-xs px-2.5 h-8 sm:h-9 font-semibold shadow-xs shrink-0"
                            >
                                View
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <Button
                                onClick={handleAdd}
                                className="flex-1 bg-white text-primary border border-primary hover:bg-primary hover:text-white transition-colors font-semibold text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
                                size="sm"
                                disabled={justAdded}
                            >
                                {justAdded ? (
                                    <>
                                        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 text-green-600" />
                                        Added
                                    </>
                                ) : (
                                    '+ Add to Quote'
                                )}
                            </Button>
                            <Link
                                href={`/products/${product.slug}`}
                                className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "hidden sm:inline-flex px-2 sm:px-3 text-xs h-8 sm:h-9")}
                            >
                                Details
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
