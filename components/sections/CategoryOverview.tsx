import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { PRODUCTS } from '@/lib/data/products';
import FadeIn, { StaggerContainer, FadeInItem } from '@/components/animations/FadeIn';

export default function CategoryOverview() {
    return (
        <section className="py-20 bg-neutral-light">
            <Container>
                <div className="mb-12">
                    <FadeIn className="text-center max-w-3xl mx-auto mb-6">
                        <span className="text-primary font-bold tracking-wide uppercase text-sm">Product Range</span>
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy mt-2">
                            Premium Surgical Bandages & Dressings, Trusted by Healthcare Professionals
                        </h2>
                        <p className="text-gray-600 mt-4 text-lg">
                            Wide range of premium surgical bandages and dressings manufactured in reliable, ISO-compliant facilities.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.2} className="text-center">
                        <Link
                            href="/products"
                            className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors"
                        >
                            View Full Catalog <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </FadeIn>
                </div>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRODUCTS.filter(p => ['p5', 'p1', 'p4', 'p7'].includes(p.id)).sort((a, b) => {
                        // Sort functionality to match specific order if needed, otherwise filter order relies on original array order
                        const order = ['p5', 'p1', 'p4', 'p7'];
                        return order.indexOf(a.id) - order.indexOf(b.id);
                    }).map((product) => (
                        <FadeInItem key={product.id}>
                            <Link
                                href={`/products/${product.slug}`}
                                className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 block"
                            >
                                {/* Product Image */}
                                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Overlay gradient for better text visibility */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-navy group-hover:text-primary transition-colors line-clamp-1">
                                        {product.name}
                                    </h3>
                                    <span className="inline-flex items-center text-sm font-medium text-primary mt-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                        View Details <ArrowRight className="ml-1 h-4 w-4" />
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
