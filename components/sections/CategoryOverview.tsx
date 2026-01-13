import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { CATEGORIES } from '@/lib/data/products';
import { cn } from '@/lib/utils';

// Mapping for future images - will be used when images are generated
// const CATEGORY_IMAGES: Record<string, string> = {
//   'sterile': '/images/categories/sterile.jpg',
//   'non-sterile': '/images/categories/non-sterile.jpg',
//   'cotton': '/images/categories/cotton.jpg',
//   'protective': '/images/categories/protective.jpg',
// };

export default function CategoryOverview() {
    return (
        <section className="py-20 bg-neutral-light">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="max-w-2xl">
                        <span className="text-primary font-bold tracking-wide uppercase text-sm">Product Range</span>
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy mt-2">
                            precision-Engineered for Medical Safety
                        </h2>
                        <p className="text-gray-600 mt-4 text-lg">
                            Comprehensive range of surgical dressing materials manufactured in reliable, ISO-compliant facilities.
                        </p>
                    </div>
                    <Link
                        href="/products"
                        className="hidden md:flex items-center text-primary font-semibold hover:text-primary-dark transition-colors mt-4 md:mt-0"
                    >
                        View Full Catalog <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/products?category=${cat.id}`}
                            className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 block"
                        >
                            {/* Image Placeholder until generated */}
                            <div className="aspect-[4/3] bg-gray-200 relative">
                                {/* <Image src={CATEGORY_IMAGES[cat.id]} alt={cat.label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" /> */}
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    <span className="text-xs">Image: {cat.label}</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-navy group-hover:text-primary transition-colors">
                                    {cat.label}
                                </h3>
                                <span className="inline-flex items-center text-sm font-medium text-primary mt-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    Explore <ArrowRight className="ml-1 h-4 w-4" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/products"
                        className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors"
                    >
                        View Full Catalog <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </Container>
        </section>
    );
}
