'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { NAV_LINKS, SITE_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/context/CartContext';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const pathname = usePathname();
    const { itemCount } = useCart();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Handle scroll effect
    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    React.useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300",
                scrolled
                    ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
                    : "bg-white border-b border-transparent"
            )}
        >
            <Container className="flex h-20 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center group">
                    <div className="relative h-14 w-52 transition-transform duration-300 group-hover:scale-105">
                        <Image
                            src="/images/Logo.png"
                            alt={SITE_NAME}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative text-sm font-semibold tracking-wide transition-colors py-2",
                                    isActive ? "text-primary" : "text-gray-600 hover:text-primary"
                                )}
                            >
                                {link.label}
                                {/* Animated Underline */}
                                <span className={cn(
                                    "absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ease-out",
                                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                )} />
                            </Link>
                        );
                    })}

                    <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                        {/* Cart Button */}
                        <Link
                            href="/inquiry"
                            className="group relative p-2.5 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-full transition-all duration-300"
                            aria-label={`View quote cart (${itemCount} items)`}
                        >
                            <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg transform transition-transform animate-in zoom-in">
                                    {itemCount}
                                </span>
                            )}
                        </Link>

                        {/* CTA Button */}
                        <Link href="/contact">
                            <Button
                                className="bg-primary hover:bg-primary-dark text-white font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 rounded-full px-6"
                            >
                                Request Quote
                            </Button>
                        </Link>
                    </div>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </Container>

            {/* Mobile Navigation */}
            <div className={cn(
                "md:hidden absolute top-20 left-0 w-full bg-white border-b shadow-xl transition-all duration-300 ease-in-out origin-top",
                isMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
            )}>
                <Container className="py-6 flex flex-col space-y-2">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center justify-between text-base font-medium px-4 py-3 transition-colors rounded-xl",
                                    isActive
                                        ? "bg-primary/5 text-primary"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                                )}
                            >
                                {link.label}
                                {isActive && <ChevronRight className="h-4 w-4" />}
                            </Link>
                        );
                    })}

                    <div className="pt-4 mt-2 border-t border-gray-100">
                        {/* Cart Link for Mobile */}
                        <Link
                            href="/inquiry"
                            className="flex items-center justify-between px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors mb-4"
                        >
                            <span className="flex items-center gap-3">
                                <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                                    <ShoppingCart className="h-5 w-5" />
                                </div>
                                Quote Cart
                            </span>
                            {itemCount > 0 && (
                                <span className="bg-primary text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </Link>

                        <Link href="/contact" className="w-full">
                            <Button className="w-full rounded-xl py-6 font-bold shadow-lg shadow-primary/20">
                                Request a Quote
                            </Button>
                        </Link>
                    </div>
                </Container>
            </div>
        </header>
    );
}
