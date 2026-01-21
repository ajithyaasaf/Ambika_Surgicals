import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { SITE_NAME, NAV_LINKS, COMPANY_INFO } from '@/lib/constants';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-navy text-white pt-12 pb-6">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="mb-4">
                            <div className="relative h-16 w-56 mb-4 brightness-0 invert">
                                <Image
                                    src="/images/Logo.png"
                                    alt={SITE_NAME}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                            Premium manufacturer of surgical dressing materials. Committed to quality, sterility, and global standards.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h4 className="font-bold mb-4 text-gray-100">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-primary-light transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products (Subset) - Placeholder functionality */}
                    <div className="col-span-1">
                        <h4 className="font-bold mb-4 text-gray-100">Products</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="/products" className="hover:text-primary-light transition-colors">Gauze Swabs</Link></li>
                            <li><Link href="/products" className="hover:text-primary-light transition-colors">Bandages</Link></li>
                            <li><Link href="/products" className="hover:text-primary-light transition-colors">Absorbent Cotton</Link></li>
                            <li><Link href="/products" className="hover:text-primary-light transition-colors">Surgical Gowns</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-span-1">
                        <h4 className="font-bold mb-4 text-gray-100">Contact Us</h4>
                        <address className="not-italic text-sm text-gray-300 space-y-2">
                            <p>{COMPANY_INFO.address}</p>
                            <p className="font-semibold text-gray-200 mt-2">Email</p>
                            <p><a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-primary-light">{COMPANY_INFO.email}</a></p>

                            <div className="mt-4 space-y-3">
                                {COMPANY_INFO.contactPersons?.map((person, index) => (
                                    <div key={index}>
                                        <p className="font-semibold text-gray-200">{person.name}</p>
                                        <p><a href={`tel:${person.phone.replace(/\s/g, '')}`} className="hover:text-primary-light">{person.phone}</a></p>
                                    </div>
                                ))}
                            </div>
                        </address>
                    </div>
                </div>

                <div className="border-t border-navy-light pt-6 text-center text-sm text-gray-400">
                    <p>&copy; {currentYear} {SITE_NAME}. All rights reserved.</p>
                    <p className="mt-2">
                        Designed & Developed by{' '}
                        <a
                            href="https://godivatech.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-light hover:text-primary transition-colors font-medium"
                        >
                            Godivatech
                        </a>
                    </p>
                </div>
            </Container>
        </footer>
    );
}
