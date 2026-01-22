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
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl font-bold font-heading text-navy">Product Catalog</h1>
                        <p className="text-gray-600 mt-2">
                            {filteredProducts.length} export-grade surgical dressing products available.
                        </p>
                    </FadeIn>

                    {/* Category Filter Pills */}
                    <FadeIn delay={0.1}>
                        <div className="flex flex-wrap gap-2">
                            <Link
                                href="/products"
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                                    !selectedCategory
                                        ? "bg-navy text-white border-navy"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-navy hover:text-navy"
                                )}
                            >
                                All
                            </Link>
                            {CATEGORIES.map(cat => (
                                <Link
                                    key={cat.id}
                                    href={`/products?category=${cat.id}`}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                                        selectedCategory === cat.id
                                            ? "bg-navy text-white border-navy"
                                            : "bg-white text-gray-600 border-gray-200 hover:border-navy hover:text-navy"
                                    )}
                                >
                                    {cat.label}
                                </Link>
                            ))}
                        </div>
                    </FadeIn>
                </div>

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
