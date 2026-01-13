import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/data/products';

const BASE_URL = 'https://ambikasurgicals.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes = [
        '',
        '/about',
        '/products',
        '/contact',
        '/export',
        '/inquiry',
        '/blog',
        '/privacy',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    const productRoutes = PRODUCTS.map((product) => ({
        url: `${BASE_URL}/products/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    return [...staticRoutes, ...productRoutes];
}
