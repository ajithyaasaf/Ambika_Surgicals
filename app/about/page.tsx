import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ShieldCheck, Factory, HeartPulse } from 'lucide-react';
import { COMPANY_INFO, SITE_NAME } from '@/lib/constants';
import FadeIn, { StaggerContainer, FadeInItem } from '@/components/animations/FadeIn';

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
                text: `Ambika Surgicals is located in Rajapalayam, Tamil Nadu, India - a strategic hub for premium cotton manufacturing. Our location provides access to high-grade raw materials and skilled expertise.`,
            },
        },
        {
            '@type': 'Question',
            name: 'How do you ensure product quality?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Every product undergoes rigorous multi-stage quality checks including raw material inspection, in-process testing, and final sterilization validation. We maintain ISO 13485 certification and conduct regular third-party audits to ensure consistent quality standards.',
            },
        },
        {
            '@type': 'Question',
            name: 'Do you deliver all over India?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, we deliver to all states and union territories across India through our extensive logistics network, ensuring timely supply to hospitals and distributors.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is your minimum order quantity?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'We understand the needs of different healthcare providers. Whether you represent a small clinic or a large hospital network, we offer flexible minimum order quantities to start our partnership.',
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
                    <FadeIn delay={0.1}>
                        <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
                            About Ambika Surgicals
                        </h1>
                        <p className="text-lg text-gray-300 max-w-2xl">
                            Setting the standard for hygiene, consistency, and reliability in surgical dressing
                            manufacturing.
                        </p>
                    </FadeIn>
                </Container>
            </section>

            {/* Main Content */}
            <section className="py-20">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <FadeIn className="space-y-6 text-lg text-gray-700 leading-relaxed">
                            <h2 className="text-3xl font-bold text-navy font-heading">
                                A Legacy of Care & <span className="text-primary">Medical Precision</span>
                            </h2>
                            <p>
                                Established in <strong>Rajapalayam</strong>, Ambika Surgicals has grown from a regional supplier to a trusted name in the global medical supply chain.
                            </p>
                            <p>
                                We manufacture surgical dressing materials using <strong>100% premium cotton</strong>, ensuring superior absorbency, softness, and safety for patient care. Our commitment to quality means every product meets rigorous international specifications.
                            </p>
                            <p>
                                At Ambika Surgicals, we provide the <strong>best quality bandages and surgical dressings at affordable prices</strong>, making healthcare more accessible without compromising on standards. For a surgeon, consistent quality can be the difference between a smooth procedure and a complication. For a hospital, reliable stock means uninterrupted patient care. We take this responsibility seriously.
                            </p>
                        </FadeIn>

                        {/* YouTube Video */}
                        <FadeIn delay={0.2} direction="left">
                            <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/DbS6qrx1EvQ"
                                    title="Ambika Surgicals"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                />
                            </div>
                        </FadeIn>
                    </div>
                </Container>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-neutral-light">
                <Container>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FadeInItem className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-primary">
                            <ShieldCheck className="h-10 w-10 text-primary mb-4" />
                            <h3 className="text-xl font-bold text-navy mb-3">Our Mission</h3>
                            <p className="text-gray-600">
                                To provide healthcare institutions with absolute confidence in their dressing
                                materials through unwavering quality control and supply chain transparency.
                            </p>
                        </FadeInItem>
                        <FadeInItem className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-navy">
                            <HeartPulse className="h-10 w-10 text-navy mb-4" />
                            <h3 className="text-xl font-bold text-navy mb-3">Our Vision</h3>
                            <p className="text-gray-600">
                                To be the preferred global partner for surgical dressings, recognized for our ethical
                                manufacturing and commitment to patient safety.
                            </p>
                        </FadeInItem>
                        <FadeInItem className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-primary">
                            <Factory className="h-10 w-10 text-primary mb-4" />
                            <h3 className="text-xl font-bold text-navy mb-3">Regional Advantage</h3>
                            <p className="text-gray-600">
                                Leveraging Rajapalayam's rich manufacturing ecosystem to source the finest cotton,
                                ensuring superior absorbency and material integrity in every product.
                            </p>
                        </FadeInItem>
                    </StaggerContainer>
                </Container>
            </section>

            {/* FAQ Section */}
            <section className="py-20">
                <Container className="max-w-3xl">
                    <FadeIn>
                        <h2 className="text-3xl font-bold text-navy font-heading mb-8 text-center">
                            Frequently Asked Questions
                        </h2>
                    </FadeIn>
                    <StaggerContainer className="space-y-6">
                        {faqSchema.mainEntity.map((faq, idx) => (
                            <FadeInItem key={idx} className="bg-neutral-light p-6 rounded-lg">
                                <h3 className="text-lg font-bold text-navy mb-2">{faq.name}</h3>
                                <p className="text-gray-600">{faq.acceptedAnswer.text}</p>
                            </FadeInItem>
                        ))}
                    </StaggerContainer>
                </Container>
            </section>
        </div>
    );
}
