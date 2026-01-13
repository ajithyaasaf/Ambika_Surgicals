'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { buttonVariants } from '@/components/ui/button';
import { NAV_LINKS, SITE_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/context/CartContext';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const pathname = usePathname();
    const { itemCount } = useCart();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Close menu when route changes
    React.useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <Container className="flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold font-heading text-navy">
                        {SITE_NAME}
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === link.href ? "text-primary" : "text-gray-600"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Cart Button */}
                    <Link
                        href="/inquiry"
                        className="relative p-2 text-gray-600 hover:text-primary transition-colors"
                        aria-label={`View quote cart (${itemCount} items)`}
                    >
                        <ShoppingCart className="h-5 w-5" />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {itemCount}
                            </span>
                        )}
                    </Link>

                    <Link href="/contact" className={buttonVariants()}>
                        Request a Quote
                    </Link>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-gray-600"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </Container>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t bg-white">
                    <Container className="py-4 flex flex-col space-y-4">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium px-2 py-1.5 transition-colors hover:bg-gray-100 rounded-md",
                                    pathname === link.href ? "text-primary font-semibold" : "text-gray-600"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Cart Link for Mobile */}
                        <Link
                            href="/inquiry"
                            className="flex items-center justify-between px-2 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            <span className="flex items-center gap-2">
                                <ShoppingCart className="h-4 w-4" />
                                Quote Cart
                            </span>
                            {itemCount > 0 && (
                                <span className="bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </Link>

                        <div className="pt-2">
                            <Link href="/contact" className={cn(buttonVariants(), "w-full")}>
                                Request a Quote
                            </Link>
                        </div>
                    </Container>
                </div>
            )}
        </header>
    );
}
