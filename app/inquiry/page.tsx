'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Button, buttonVariants } from '@/components/ui/button';
import { useCart } from '@/lib/context/CartContext';
import { Trash2, ArrowLeft, Send, Minus, Plus } from 'lucide-react';
// Reusing ContactForm logic but adapted for Quote
import ContactForm from '@/components/forms/ContactForm';
import FadeIn, { StaggerContainer, FadeInItem } from '@/components/animations/FadeIn';

export default function InquiryPage() {
    const { items, removeItem, updateQuantity, clearCart } = useCart();
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    // If cart is empty
    if (items.length === 0 && !isSubmitted) {
        return (
            <div className="bg-neutral-light min-h-screen py-20">
                <Container className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading text-navy mb-4">Your Quote Request is Empty</h1>
                    <p className="text-gray-600 mb-8">Browse our catalog to add products to your inquiry.</p>
                    <Link href="/products" className={buttonVariants()}>
                        View Products
                    </Link>
                </Container>
            </div>
        );
    }

    return (
        <div className="bg-neutral-light min-h-screen py-16">
            <Container>
                <Link href="/products" className="inline-flex items-center text-sm text-gray-500 hover:text-navy transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Continue Browsing
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <FadeIn>
                            <h1 className="text-4xl md:text-5xl font-bold font-heading text-navy mb-6">Request for Quote</h1>
                        </FadeIn>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                                <h2 className="font-semibold text-navy">Items in your list ({items.length})</h2>
                            </div>
                            <StaggerContainer as="ul" className="divide-y divide-gray-100">
                                {items.map((item) => (
                                    <FadeInItem as="li" key={item.id} className="p-6">
                                        <div className="flex items-center gap-4">
                                            {/* Product Image */}
                                            <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                                {item.imageUrl ? (
                                                    <Image
                                                        src={item.imageUrl}
                                                        alt={item.name}
                                                        fill
                                                        sizes="64px"
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                                        No Image
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-grow min-w-0">
                                                <h3 className="font-bold text-navy text-lg mb-1">{item.name}</h3>
                                                <p className="text-sm text-gray-500 truncate">{item.shortDescription}</p>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2 shrink-0">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="text-lg font-bold text-navy min-w-[2.5ch] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-md bg-primary hover:bg-primary/90 text-white transition-colors"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </FadeInItem>
                                ))}
                            </StaggerContainer>
                            {items.length > 0 && (
                                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                                    <Button variant="outline" size="sm" onClick={clearCart} className="text-gray-500">
                                        Clear List
                                    </Button>
                                </div>
                            )}
                        </div>

                        <FadeIn delay={0.2} className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-blue-800 text-sm mb-8">
                            <strong>Note:</strong> This is a preliminary inquiry. Our team will contact you to discuss specific quantities, packaging requirements, and shipping terms before finalizing the quote.
                        </FadeIn>
                    </div>

                    {/* Submission Form */}
                    <div className="lg:col-span-1">
                        <FadeIn delay={0.3} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-bold text-navy mb-4">Submit Inquiry</h2>
                            {/* Reuse Contact Form logic or simpler version */}
                            <ContactForm
                                isQuoteRequest={true}
                                productItems={items.map(item => ({ id: item.id, quantity: item.quantity }))}
                                onSuccess={clearCart}
                            />
                        </FadeIn>
                    </div>
                </div>
            </Container>
        </div>
    );
}
