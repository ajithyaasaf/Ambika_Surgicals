import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Knowledge Hub & Industry Insights',
    description: 'Insights on surgical dressing manufacturing, quality standards, and medical consumable procurement trends.',
};

const ARTICLES = [
    {
        slug: 'quality-standards-surgical-dressings',
        title: 'Understanding BP vs USP Standards in Surgical Dressings',
        excerpt: 'A comprehensive guide to British Pharmacopoeia and US Pharmacopeia standards for gauze manufacturing and what hospitals need to verify.',
        date: 'October 15, 2025',
        category: 'Quality Control'
    },
    {
        slug: 'sterilization-methods-explained',
        title: 'EO vs. Gamma Sterilization: What Procurement Managers Should Know',
        excerpt: 'Comparing different sterilization methodologies for surgical sponges and their impact on shelf-life and patient safety.',
        date: 'November 2, 2025',
        category: 'Manufacturing'
    },
    {
        slug: 'cotton-sourcing-rajapalayam',
        title: 'Why Rajapalayam is the Hub for Surgical Dressings',
        excerpt: 'How regional access to high-grade Shankar-6 cotton enables superior absorbency and material strength in medical consumables.',
        date: 'December 10, 2025',
        category: 'Supply Chain'
    }
];

export default function BlogPage() {
    return (
        <div className="bg-neutral-light min-h-screen py-16">
            <Container>
                <div className="text-center mb-16">
                    <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-primary border border-primary/20 uppercase tracking-wide">
                        Knowledge Hub
                    </span>
                    <h1 className="text-4xl font-bold font-heading text-navy mt-4 mb-4">Manufacturing Insights</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Technical resources and industry updates for healthcare procurement professionals.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ARTICLES.map((article, idx) => (
                        <article key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col">
                            <div className="mb-4">
                                <span className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded">
                                    {article.category}
                                </span>
                            </div>
                            <h2 className="text-xl font-bold text-navy mb-3 leading-tight">
                                <Link href={`#`} className="hover:text-primary transition-colors">
                                    {article.title}
                                </Link>
                            </h2>
                            <p className="text-gray-600 text-sm mb-6 flex-grow">
                                {article.excerpt}
                            </p>
                            <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                                <span className="text-xs text-gray-400">{article.date}</span>
                                <Link href={`#`} className="text-sm font-medium text-navy hover:text-primary inline-flex items-center">
                                    Read Article <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-16 bg-navy text-white rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
                    <BookOpen className="w-64 h-64 text-white/5 absolute -top-10 -right-10 leading-none" />
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold font-heading mb-4">Download Our Product Catalog</h2>
                        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                            Get detailed specifications, sizing charts, and packing information in our comprehensive PDF catalog.
                        </p>
                        <Link
                            href="#"
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-navy bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy focus:ring-white"
                        >
                            Download PDF (2.4 MB)
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
}
