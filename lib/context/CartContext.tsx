'use client';

import * as React from 'react';
import { Product } from '@/lib/data/products';

export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    itemCount: number;
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'ambika-surgicals-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = React.useState<CartItem[]>([]);
    const [isHydrated, setIsHydrated] = React.useState(false);

    // Load cart from localStorage on mount (client-side only)
    React.useEffect(() => {
        try {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);
            if (savedCart) {
                setItems(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error('Failed to load cart from localStorage:', error);
        }
        setIsHydrated(true);
    }, []);

    // Save cart to localStorage whenever it changes
    React.useEffect(() => {
        if (isHydrated) {
            try {
                localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
            } catch (error) {
                console.error('Failed to save cart to localStorage:', error);
            }
        }
    }, [items, isHydrated]);

    const addItem = React.useCallback((product: Product) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    }, []);

    const removeItem = React.useCallback((productId: string) => {
        setItems((prev) => prev.filter((item) => item.id !== productId));
    }, []);

    const updateQuantity = React.useCallback((productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId);
            return;
        }
        setItems((prev) =>
            prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
        );
    }, []);

    const clearCart = React.useCallback(() => {
        setItems([]);
    }, []);

    const [isOpen, setIsOpen] = React.useState(false);

    const openCart = React.useCallback(() => setIsOpen(true), []);
    const closeCart = React.useCallback(() => setIsOpen(false), []);
    const toggleCart = React.useCallback(() => setIsOpen((prev) => !prev), []);

    const itemCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                itemCount,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                isOpen,
                openCart,
                closeCart,
                toggleCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = React.useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}
