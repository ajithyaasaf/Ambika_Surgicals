import { Product, PRODUCTS } from '@/lib/data/products';

/**
 * Get related products based on category and features
 * @param currentProduct - The current product
 * @param limit - Number of related products to return (default: 3)
 */
export function getRelatedProducts(currentProduct: Product, limit: number = 3): Product[] {
    // Filter products by same category, excluding current product
    const sameCategoryProducts = PRODUCTS.filter(
        (p) => p.category === currentProduct.category && p.id !== currentProduct.id
    );

    // If we have enough products in the same category, return them
    if (sameCategoryProducts.length >= limit) {
        return sameCategoryProducts.slice(0, limit);
    }

    // Otherwise, mix with products from other categories
    const otherProducts = PRODUCTS.filter(
        (p) => p.category !== currentProduct.category && p.id !== currentProduct.id
    );

    return [...sameCategoryProducts, ...otherProducts].slice(0, limit);
}

/**
 * Generate breadcrumb schema for product pages
 */
export function generateBreadcrumbSchema(productName: string, productSlug: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://ambikasurgicals.com',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Products',
                item: 'https://ambikasurgicals.com/products',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: productName,
                item: `https://ambikasurgicals.com/products/${productSlug}`,
            },
        ],
    };
}
