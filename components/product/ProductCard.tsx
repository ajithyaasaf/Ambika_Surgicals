'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/data/products';
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                    <span className="bg-white/90 backdrop-blur text-navy text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {product.category}
                    </span>
                </div>

                {/* In-Quote Badge */}
                {isInCart && (
                    <div className="absolute top-3 right-3 z-10 animate-in fade-in zoom-in-95 duration-200">
                        <span className="bg-primary text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                            <Check className="w-3 h-3" /> In Quote ({quantity})
                        </span>
                    </div>
                )}
            </Link>

            <div className="p-5 flex flex-col flex-grow">
                <Link href={`/products/${product.slug}`}>
                    <h3 className="text-lg font-bold text-navy font-heading hover:text-primary transition-colors mb-2 line-clamp-1">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-sm text-gray-500 mb-4 flex-grow line-clamp-2">
                    {product.shortDescription}
                </p>

                <div className="mt-auto">
                    {isInCart ? (
                        <div className="flex items-center gap-2">
                            {/* Quantity Stepper */}
                            <div className="flex-1 flex items-center justify-between border border-primary/30 bg-primary/5 rounded-lg p-1">
                                <button
                                    onClick={() => updateQuantity(product.id, quantity - 1)}
                                    className="w-7 h-7 flex items-center justify-center rounded-md bg-white text-primary hover:bg-primary hover:text-white shadow-xs transition-colors"
                                    aria-label="Decrease quantity"
                                >
                                    <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-xs font-bold text-navy px-1 select-none">
                                    {quantity} in Quote
                                </span>
                                <button
                                    onClick={() => updateQuantity(product.id, quantity + 1)}
                                    className="w-7 h-7 flex items-center justify-center rounded-md bg-primary text-white hover:bg-primary-dark shadow-xs transition-colors"
                                    aria-label="Increase quantity"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            {/* View Quote Button */}
                            <Button
                                onClick={openCart}
                                size="sm"
                                className="bg-navy hover:bg-navy-light text-white text-xs px-3 font-semibold shadow-xs"
                            >
                                View Quote
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Button
                                onClick={handleAdd}
                                className="flex-1 bg-white text-primary border border-primary hover:bg-primary hover:text-white transition-colors font-semibold"
                                size="sm"
                                disabled={justAdded}
                            >
                                {justAdded ? (
                                    <>
                                        <Check className="w-4 h-4 mr-1" />
                                        Added
                                    </>
                                ) : (
                                    '+ Add to Quote'
                                )}
                            </Button>
                            <Link href={`/products/${product.slug}`} className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "px-3 text-xs")}>
                                Details
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
