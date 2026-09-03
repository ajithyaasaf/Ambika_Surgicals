import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import ProductCard from '@/components/product/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/lib/data/products';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import FadeIn, { StaggerContainer, FadeInItem } from '@/components/animations/FadeIn';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Our Products',
    description: 'Explore our range of surgical dressing materials including gauze swabs, roller bandages, and absorbent cotton. ISO-certified quality for hospitals and exporters.',
};

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: { category?: string };
}) {
    const { category } = await searchParams;
    const selectedCategory = category;

    const filteredProducts = selectedCategory
        ? PRODUCTS.filter(p => p.category === selectedCategory)
        : PRODUCTS;

    return (
        <div className="bg-neutral-light min-h-screen py-16">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 w-full min-w-0">
                    <FadeIn>
                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-heading text-navy">Product Catalog</h1>
                        <p className="text-gray-600 text-xs sm:text-sm mt-1">
                            {filteredProducts.length} export-grade surgical dressing products available.
                        </p>
                    </FadeIn>

                    {/* Category Filter Pills (Smooth horizontal touch scroll on mobile) */}
                    <div className="w-full min-w-0 md:w-auto overflow-hidden">
                        <div className="flex items-center overflow-x-auto py-1.5 md:py-0 md:flex-wrap gap-2 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar touch-pan-x overscroll-x-contain">
                            <Link
                                href="/products"
                                className={cn(
                                    "px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors border whitespace-nowrap shrink-0",
                                    !selectedCategory
                                        ? "bg-navy text-white border-navy shadow-xs"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-navy hover:text-navy"
                                )}
                            >
                                All Products
                            </Link>
                            {CATEGORIES.map(cat => (
                                <Link
                                    key={cat.id}
                                    href={`/products?category=${cat.id}`}
                                    className={cn(
                                        "px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors border whitespace-nowrap shrink-0",
                                        selectedCategory === cat.id
                                            ? "bg-navy text-white border-navy shadow-xs"
                                            : "bg-white text-gray-600 border-gray-200 hover:border-navy hover:text-navy"
                                    )}
                                >
                                    {cat.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Grid (2 columns on mobile, 3 on tablet, 4 on desktop) */}
                {filteredProducts.length > 0 ? (
                    <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                        {filteredProducts.map(product => (
                            <FadeInItem key={product.id}>
                                <ProductCard product={product} />
                            </FadeInItem>
                        ))}
                    </StaggerContainer>
                ) : (
                    <FadeIn className="text-center py-20 bg-white rounded-lg shadow-sm">
                        <p className="text-gray-500 text-lg">No products found in this category.</p>
                        <Link href="/products" className="text-primary font-semibold hover:underline mt-2 inline-block">
                            View all products
                        </Link>
                    </FadeIn>
                )}
            </Container>
        </div>
    );
}
