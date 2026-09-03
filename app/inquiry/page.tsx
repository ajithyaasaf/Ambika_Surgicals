'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Button, buttonVariants } from '@/components/ui/button';
import { useCart } from '@/lib/context/CartContext';
import { Trash2, ArrowLeft, Send, Minus, Plus } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import ContactForm from '@/components/forms/ContactForm';
import FadeIn, { StaggerContainer, FadeInItem } from '@/components/animations/FadeIn';
import { COMPANY_INFO } from '@/lib/constants';

export default function InquiryPage() {
    const { items, removeItem, updateQuantity, clearCart } = useCart();
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const handleSuccess = () => {
        setIsSubmitted(true);
        clearCart();
    };

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

    // Success View
    if (isSubmitted) {
        return (
            <div className="bg-neutral-light min-h-screen py-20">
                <Container className="text-center max-w-2xl">
                    <FadeIn>
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                            <Send className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-heading text-navy mb-6">Quote Request Sent!</h1>
                        <p className="text-gray-600 text-lg mb-8">
                            Thank you for your interest. We have received your inquiry and our team will get back to you with a detailed quote shortly.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/" className={buttonVariants({ variant: 'outline' })}>
                                Return Home
                            </Link>
                            <Link href="/products" className={buttonVariants()}>
                                Browse More Products
                            </Link>
                        </div>
                    </FadeIn>
                </Container>
            </div>
        );
    }

    // If cart is empty (and not just submitted)
    if (items.length === 0) {
        return (
            <div className="bg-neutral-light min-h-screen py-20">
                <Container className="text-center max-w-md mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold font-heading text-navy mb-4">Your Quote Request is Empty</h1>
                    <p className="text-gray-600 mb-8 text-sm">
                        Browse our catalog to select surgical dressings, bandages, or cotton products for an official quote.
                    </p>
                    <Link href="/products" className={buttonVariants({ size: 'lg' })}>
                        Explore Product Catalog
                    </Link>
                </Container>
            </div>
        );
    }

    return (
        <div className="bg-neutral-light min-h-screen py-12 md:py-16">
            <Container>
                <Link href="/products" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-navy transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4 mr-1.5" /> Continue Browsing Products
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <FadeIn>
                            <h1 className="text-3xl md:text-4xl font-bold font-heading text-navy mb-2">Request for Quote</h1>
                            <p className="text-gray-600 text-sm mb-6">
                                Review your selected items, adjust quantities, and submit your request for direct manufacturer pricing.
                            </p>
                        </FadeIn>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                            <div className="p-4 sm:p-6 border-b border-gray-100 bg-gray-50/70 flex items-center justify-between">
                                <h2 className="font-bold text-navy text-base">Selected Products ({items.length})</h2>
                                <Button variant="ghost" size="sm" onClick={clearCart} className="text-gray-500 text-xs hover:text-red-600">
                                    Clear All
                                </Button>
                            </div>
                            <StaggerContainer as="ul" className="divide-y divide-gray-100">
                                {items.map((item) => (
                                    <FadeInItem as="li" key={item.id} className="p-4 sm:p-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            {/* Product Image & Info */}
                                            <div className="flex items-center gap-4 flex-grow min-w-0">
                                                <Link href={`/products/${item.slug}`} className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-100">
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
                                                </Link>

                                                <div className="flex-grow min-w-0">
                                                    <Link href={`/products/${item.slug}`}>
                                                        <h3 className="font-bold text-navy text-base hover:text-primary transition-colors line-clamp-1">
                                                            {item.name}
                                                        </h3>
                                                    </Link>
                                                    <p className="text-xs text-gray-500 line-clamp-1">{item.shortDescription}</p>
                                                    <span className="inline-block mt-1 text-[11px] font-semibold text-primary capitalize bg-primary/5 px-2 py-0.5 rounded">
                                                        {item.category.replace('-', ' ')}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Responsive Controls Bar */}
                                            <div className="flex items-center justify-between sm:justify-end gap-4 pl-20 sm:pl-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 shrink-0">
                                                <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-l-lg transition-colors disabled:opacity-50"
                                                        disabled={item.quantity <= 1}
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus className="w-3.5 h-3.5" />
                                                    </button>
                                                    <span className="w-9 text-center text-sm font-bold text-navy select-none">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-r-lg transition-colors"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </FadeInItem>
                                ))}
                            </StaggerContainer>
                        </div>

                        <FadeIn delay={0.2} className="bg-blue-50/70 border border-blue-100 p-4 rounded-xl text-blue-900 text-xs sm:text-sm">
                            <strong>Direct Manufacturer Assurance:</strong> Our sales engineers review every quote to provide customized volume pricing, batch COA documentation, and expedited dispatch terms.
                        </FadeIn>
                    </div>

                    {/* Submission Form & Instant WhatsApp */}
                    <div className="lg:col-span-1">
                        <FadeIn delay={0.3} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24 space-y-6">
                            <div>
                                <h2 className="text-xl font-bold text-navy">Submit Inquiry</h2>
                                <p className="text-xs text-gray-500 mt-1">We will email you an itemized quotation promptly.</p>
                            </div>

                            <ContactForm
                                isQuoteRequest={true}
                                productItems={items.map(item => ({ id: item.id, quantity: item.quantity }))}
                                onSuccess={handleSuccess}
                            />

                            {/* 1-Click WhatsApp Alternative */}
                            <div className="pt-4 border-t border-gray-100 text-center">
                                <p className="text-xs text-gray-500 mb-3">Prefer an instant response?</p>
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-4 rounded-xl font-bold shadow-sm transition-all text-sm"
                                >
                                    <FaWhatsapp className="w-5 h-5 text-white shrink-0" />
                                    <span>Send List via WhatsApp</span>
                                </a>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </Container>
        </div>
    );
}
