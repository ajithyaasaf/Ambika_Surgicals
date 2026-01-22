import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { CartProvider } from '@/lib/context/CartContext';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import CartDrawer from '@/components/cart/CartDrawer';
import TestimonialVideoModal from '@/components/ui/TestimonialVideoModal';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    template: '%s | Ambika Surgicals',
    default: 'Ambika Surgicals - Premium Surgical Dressing Manufacturer',
  },
  description: 'Leading manufacturer and exporter of surgical dressing materials in India. ISO certified quality, bulk hospital supplies, and export-grade cotton products.',
  metadataBase: new URL('https://ambikasurgicals.com'),
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ambika Surgicals',
    url: 'https://ambikasurgicals.com',
    logo: 'https://ambikasurgicals.com/logo.png', // Placeholder
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9876543210', // Updated placeholder
      contactType: 'sales',
      areaServed: ['IN', 'US', 'GB', 'AE'],
      availableLanguage: 'en'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rajapalayam',
      addressLocality: 'Virudhunagar',
      addressRegion: 'Tamil Nadu',
      postalCode: '626117',
      addressCountry: 'IN'
    }
  };

  return (
    <html lang="en" className={cn(inter.variable, poppins.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans antialiased text-neutral-gray bg-neutral-light min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
          <CartDrawer />
          <TestimonialVideoModal />
        </CartProvider>
      </body>
    </html>
  );
}
