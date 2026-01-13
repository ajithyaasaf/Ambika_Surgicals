import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ShieldCheck, Factory, HeartPulse } from 'lucide-react';
import { COMPANY_INFO, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
    title: 'About Us - Manufacturing Excellence Since 2010',
    description: 'Ambika Surgicals: Leading manufacturer of surgical dressing materials in Rajapalayam, Tamil Nadu. Committed to global quality standards and patient safety.',
};

// FAQ Schema for About Page
const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Where is Ambika Surgicals located?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: `Ambika Surgicals is located in Rajapalayam, Tamil Nadu, India - the heart of India's textile belt. Our strategic location provides access to premium cotton and skilled textile expertise.`,
            },
        },
        {
            '@type': 'Question',
            name: 'What quality standards do you follow?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'We manufacture products conforming to BP (British Pharmacopoeia), USP (United States Pharmacopeia), and EP (European Pharmacopoeia) standards. We are ISO 13485 certified for medical device quality management.',
            },
        },
        {
            '@type': 'Question',
            name: 'Do you export internationally?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, we export to over 25 countries worldwide with complete documentation support including COA, COO, and sterilization certificates for smooth customs clearance.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is your minimum order quantity?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Minimum order quantities vary by product and are designed for bulk/export orders. Please contact our sales team for specific MOQ details and pricing.',
            },
        },
    ],
};

export default function AboutPage() {
    return (
        <div className="bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Page Header */}
            <section className="bg-navy py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <circle cx="90" cy="10" r="40" fill="white" />
                    </svg>
                </div>
                <Container className="relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
                        About Ambika Surgicals
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl">
                        Setting the standard for hygiene, consistency, and reliability in medical textile
                        manufacturing.
                    </p>
                </Container>
            </section>

            {/* Main Content */}
            <section className="py-20">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                            <h2 className="text-3xl font-bold text-navy font-heading">
                                A Legacy of Care & <span className="text-primary">Medical Precision</span>
                            </h2>
                            <p>
                                Established in <strong>Rajapalayam</strong>, the heart of Tamil Nadu's textile
                                belt, Ambika Surgicals has grown from a regional supplier to a trusted name in the
                                global medical supply chain.
                            </p>
                            <p>
                                Our location offers us a strategic advantage: access to premium high-grade cotton
                                and a skilled workforce with deep expertise in textile processing. We leverage this
                                to produce surgical dressing materials that meet rigorous international
                                specifications.
                            </p>
                            <p>
                                We do not just manufacture products; we manufacture trust. For a surgeon, a
                                consistent gauge of gauze can be the difference between a smooth procedure and a
                                complication. For a hospital, reliable stock means uninterrupted patient care. We
                                take this responsibility seriously.
                            </p>
                        </div>

                        {/* Visual/Image Placeholder */}
                        <div className="aspect-square bg-neutral-light rounded-2xl flex items-center justify-center relative overflow-hidden">
                            <div className="text-center p-8">
                                <Factory className="mx-auto h-24 w-24 text-gray-300 mb-4" />
                                <span className="text-gray-400 font-medium">Manufacturing Facility</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-neutral-light">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-primary">
                            <ShieldCheck className="h-10 w-10 text-primary mb-4" />
                            <h3 className="text-xl font-bold text-navy mb-3">Our Mission</h3>
                            <p className="text-gray-600">
                                To provide healthcare institutions with absolute confidence in their dressing
                                materials through unwavering quality control and supply chain transparency.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-navy">
                            <HeartPulse className="h-10 w-10 text-navy mb-4" />
                            <h3 className="text-xl font-bold text-navy mb-3">Our Vision</h3>
                            <p className="text-gray-600">
                                To be the preferred global partner for surgical textiles, recognized for our ethical
                                manufacturing and commitment to patient safety.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-primary">
                            <Factory className="h-10 w-10 text-primary mb-4" />
                            <h3 className="text-xl font-bold text-navy mb-3">Regional Advantage</h3>
                            <p className="text-gray-600">
                                Leveraging Rajapalayam's rich textile ecosystem to source the finest cotton,
                                ensuring superior absorbency and fabric integrity in every product.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* FAQ Section */}
            <section className="py-20">
                <Container className="max-w-3xl">
                    <h2 className="text-3xl font-bold text-navy font-heading mb-8 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {faqSchema.mainEntity.map((faq, idx) => (
                            <div key={idx} className="bg-neutral-light p-6 rounded-lg">
                                <h3 className="text-lg font-bold text-navy mb-2">{faq.name}</h3>
                                <p className="text-gray-600">{faq.acceptedAnswer.text}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    );
}
