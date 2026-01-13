import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ShieldCheck, FileCheck, Truck, Award, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '@/lib/data/products';
import { Container } from '@/components/ui/container';
import { buttonVariants } from '@/components/ui/button';
import { SITE_NAME } from '@/lib/constants';
import { AddToQuoteButton } from '@/components/product/AddToQuoteButton';
import ProductCard from '@/components/product/ProductCard';
import { getRelatedProducts, generateBreadcrumbSchema } from '@/lib/product-utils';
import { cn } from '@/lib/utils';

interface Props {
    params: { slug: string };
}

// Generate Static Params for SEO
export function generateStaticParams() {
    return PRODUCTS.map((product) => ({
        slug: product.slug,
    }));
}

// Dynamic SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = PRODUCTS.find((p) => p.slug === slug);
    if (!product) return { title: 'Product Not Found' };

    return {
        title: `${product.name} - ${SITE_NAME}`,
        description: product.description.substring(0, 160),
        alternates: {
            canonical: `/products/${product.slug}`,
        },
        openGraph: {
            title: product.name,
            description: product.description,
        },
    };
}

export default async function ProductDetailPage({ params }: Props) {
    const { slug } = await params;
    const product = PRODUCTS.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    // JSON-LD Product Schema
    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: `https://ambikasurgicals.com${product.imageUrl}`,
        brand: {
            '@type': 'Brand',
            name: SITE_NAME,
        },
        manufacturer: {
            '@type': 'Organization',
            name: SITE_NAME,
        },
        sku: product.id,
        offers: {
            '@type': 'AggregateOffer',
            price: '0',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            offerCount: '1'
        }
    };

    // Breadcrumb Schema
    const breadcrumbSchema = generateBreadcrumbSchema(product.name, product.slug);

    // Get Related Products
    const relatedProducts = getRelatedProducts(product, 3);

    return (
        <div className="bg-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Breadcrumb Navigation */}
            <div className="bg-neutral-light border-b border-gray-200">
                <Container className="py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/products" className="hover:text-primary transition-colors">
                            Products
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-navy font-medium">{product.name}</span>
                    </div>
                </Container>
            </div>

            {/* Product Hero Section */}
            <section className="py-12 md:py-20">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Product Image */}
                        <div className="space-y-6">
                            <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border-2 border-gray-200 relative overflow-hidden">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                                    <ShieldCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                    <p className="text-xs font-semibold text-green-900">Quality Assured</p>
                                </div>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                                    <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                    <p className="text-xs font-semibold text-blue-900">ISO 13485</p>
                                </div>
                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                                    <Truck className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                                    <p className="text-xs font-semibold text-orange-900">Fast Delivery</p>
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-8">
                            {/* Category Badge */}
                            <div>
                                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full uppercase tracking-wider border border-primary/20">
                                    {product.category.replace('-', ' ')}
                                </span>
                            </div>

                            {/* Product Name */}
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold font-heading text-navy mb-4 leading-tight">
                                    {product.name}
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Key Features */}
                            {product.features.length > 0 && (
                                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6">
                                    <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-4">
                                        Key Features
                                    </h3>
                                    <ul className="space-y-2">
                                        {product.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <AddToQuoteButton product={product} />
                                <Link
                                    href="/contact"
                                    className={cn(buttonVariants({ variant: "outline", size: "lg" }), "hover:bg-navy hover:text-white hover:border-navy transition-all duration-300")}
                                >
                                    Custom Requirement?
                                </Link>
                            </div>

                            {/* Note */}
                            <p className="text-sm text-gray-500 border-l-4 border-primary pl-4 py-2">
                                <strong>Note:</strong> Minimum Order Quantity applies for bulk/export orders. Contact us for detailed pricing.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Technical Specifications */}
            <section className="py-16 bg-neutral-light">
                <Container>
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy mb-8 text-center">
                            Technical Specifications
                        </h2>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                                {Object.entries(product.specs).map(([key, value], idx) => (
                                    <div key={idx} className="p-6 hover:bg-gray-50 transition-colors">
                                        <dt className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                            {key}
                                        </dt>
                                        <dd className="text-lg font-bold text-navy">
                                            {value}
                                        </dd>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Why Quality Matters */}
            <section className="py-20">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy mb-4">
                                Why Quality Matters
                            </h2>
                            <p className="text-lg text-gray-600">
                                The hidden risks of inferior {product.name.toLowerCase()} and how we prevent them.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {product.benefits.map((benefit, idx) => (
                                <div key={idx} className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-xl border-2 border-red-100 hover:border-primary transition-colors duration-300 group">
                                    <div className="flex items-start gap-4">
                                        <div className="shrink-0">
                                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                                                <ShieldCheck className="w-6 h-6 text-primary" />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-navy mb-2 text-lg">Risk Prevention</h4>
                                            <p className="text-gray-700 leading-relaxed">{benefit}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Compliance Badge */}
                        <div className="mt-12 flex justify-center">
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-50 text-green-700 rounded-full font-medium border-2 border-green-200">
                                <FileCheck className="w-5 h-5" />
                                <span>Certificate of Analysis (COA) provided with every batch</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="py-16 bg-neutral-light border-t border-gray-200">
                    <Container>
                        <div className="mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy mb-3">
                                Related Products
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Other medical supplies you might be interested in
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard key={relatedProduct.id} product={relatedProduct} />
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-navy to-navy-light text-white">
                <Container>
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                            Ready to Order?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Get a customized quote for {product.name} tailored to your requirements.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "bg-white text-navy hover:bg-gray-100")}>
                                Request Detailed Quote
                            </Link>
                            <Link href="/products" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "border-white text-white hover:bg-white hover:text-navy")}>
                                Browse All Products
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}
