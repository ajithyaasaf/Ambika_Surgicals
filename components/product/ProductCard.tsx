'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/data/products';
import { Button, buttonVariants } from '@/components/ui/button';
import { useCart } from '@/lib/context/CartContext';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addItem, items } = useCart();
    const [justAdded, setJustAdded] = React.useState(false);

    // Check if product is already in cart
    const isInCart = items.some(item => item.id === product.id);

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

                <div className="mt-auto flex items-center gap-3">
                    <Button
                        onClick={handleAdd}
                        className="flex-1 bg-white text-primary border border-primary hover:bg-primary hover:text-white transition-colors"
                        size="sm"
                        disabled={justAdded}
                    >
                        {justAdded ? (
                            <>
                                <Check className="w-4 h-4 mr-1" />
                                Added
                            </>
                        ) : (
                            'Add to Inquiry'
                        )}
                    </Button>
                    <Link href={`/products/${product.slug}`} className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "px-3")}>
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
