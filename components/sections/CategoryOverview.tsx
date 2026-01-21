import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { CATEGORIES } from '@/lib/data/products';
import FadeIn, { StaggerContainer, FadeInItem } from '@/components/animations/FadeIn';

// Representative product images for each category
const CATEGORY_IMAGES: Record<string, string> = {
    'sterile-dressing': '/images/products/1. GAUZE SWABS.jpg',
    'bandages': '/images/products/4. ROLLER BANDAGE.jpg',
    'cotton-products': '/images/products/7. ABSORBENT COTTON.jpg',
    'medical-kits': '/images/products/10. DRESSING KIT & DIALYSIS KIT.jpg',
    'protective-wear': '/images/products/12. patient gown & surgeon gown.jpg',
};

export default function CategoryOverview() {
    return (
        <section className="py-20 bg-neutral-light">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <FadeIn direction="right" className="max-w-2xl">
                        <span className="text-primary font-bold tracking-wide uppercase text-sm">Product Range</span>
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy mt-2">
                            Comprehensive Surgical Products, Precision-Engineered for Medical Safety
                        </h2>
                        <p className="text-gray-600 mt-4 text-lg">
                            Comprehensive range of surgical dressing materials manufactured in reliable, ISO-compliant facilities.
                        </p>
                    </FadeIn>
                    <FadeIn direction="left" delay={0.2}>
                        <Link
                            href="/products"
                            className="hidden md:flex items-center text-primary font-semibold hover:text-primary-dark transition-colors mt-4 md:mt-0"
                        >
                            View Full Catalog <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </FadeIn>
                </div>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CATEGORIES.map((cat) => (
                        <FadeInItem key={cat.id}>
                            <Link
                                href={`/products?category=${cat.id}`}
                                className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 block"
                            >
                                {/* Category Image */}
                                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                                    <Image
                                        src={CATEGORY_IMAGES[cat.id]}
                                        alt={cat.label}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Overlay gradient for better text visibility */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                        </FadeInItem>
                    ))}
                </StaggerContainer>

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
