'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/data/products';
import { useCart } from '@/lib/context/CartContext';
import { Check } from 'lucide-react';

interface AddToQuoteButtonProps {
    product: Product;
    className?: string;
}

export function AddToQuoteButton({ product, className }: AddToQuoteButtonProps) {
    const { addItem, items } = useCart();
    const [justAdded, setJustAdded] = React.useState(false);

    // Check if product is already in cart
    const isInCart = items.some(item => item.id === product.id);

    const handleAdd = () => {
        addItem(product);
        setJustAdded(true);

        // Reset the "just added" state after 2 seconds
        setTimeout(() => {
            setJustAdded(false);
        }, 2000);
    };

    return (
        <Button
            onClick={handleAdd}
            size="lg"
            className={className}
            disabled={justAdded}
        >
            {justAdded ? (
                <>
                    <Check className="w-5 h-5 mr-2" />
                    Added to Quote
                </>
            ) : isInCart ? (
                'Add Another'
            ) : (
                'Add to Quote Request'
            )}
        </Button>
    );
}
