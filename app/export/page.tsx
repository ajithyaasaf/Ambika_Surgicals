import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { buttonVariants } from '@/components/ui/button';
import { Globe2, FileCheck, Package, Ship } from 'lucide-react';
import FadeIn, { StaggerContainer, FadeInItem } from '@/components/animations/FadeIn';

export const metadata: Metadata = {
    title: 'Export & International Supply',
    description: 'Ambika Surgicals is an export-ready manufacturer of surgical dressings. CE/ISO compliant, custom packaging, and reliable shipping to global markets.',
};

export default function ExportPage() {
    return (
        <div className="bg-white min-h-screen">
            <section className="bg-navy py-20 text-center relative overflow-hidden">
                {/* Abstract Map Background */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <Globe2 className="w-96 h-96 absolute -right-20 -bottom-20 text-white" />
                </div>

                <Container className="relative z-10">
                    <FadeIn delay={0.1}>
                        <span className="inline-block px-3 py-1 bg-white/10 text-primary-light border border-white/20 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
                            Global Partnerships
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6">Export-Ready Manufacturing</h1>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            Reliable supply chain solutions for international distributors and healthcare providers.
                        </p>
                    </FadeIn>
                </Container>
            </section>

            <section className="py-20">
                <Container>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                        <FadeInItem className="p-6 bg-neutral-light rounded-xl border border-gray-100">
                            <FileCheck className="w-10 h-10 text-primary mb-4" />
                            <h3 className="font-bold text-navy text-lg mb-2">Documentation</h3>
                            <p className="text-sm text-gray-600">Complete documentation support including COA, COO, and sterilisation certificates for smooth customs clearance.</p>
                        </FadeInItem>
                        <FadeInItem className="p-6 bg-neutral-light rounded-xl border border-gray-100">
                            <Package className="w-10 h-10 text-navy mb-4" />
                            <h3 className="font-bold text-navy text-lg mb-2">Custom Packaging</h3>
                            <p className="text-sm text-gray-600">Private labeling (OEM) and customized packaging options available to meet your market regulations.</p>
                        </FadeInItem>
                        <FadeInItem className="p-6 bg-neutral-light rounded-xl border border-gray-100">
                            <Ship className="w-10 h-10 text-primary mb-4" />
                            <h3 className="font-bold text-navy text-lg mb-2">Logistics</h3>
                            <p className="text-sm text-gray-600">Strategic proximity to Tuticorin and Chennai ports ensures timely shipments and reduced transit costs.</p>
                        </FadeInItem>
                        <FadeInItem className="p-6 bg-neutral-light rounded-xl border border-gray-100">
                            <Globe2 className="w-10 h-10 text-navy mb-4" />
                            <h3 className="font-bold text-navy text-lg mb-2">Global Standards</h3>
                            <p className="text-sm text-gray-600">Manufacturing processes aligned with BP, USP, and EP standards for universal acceptance.</p>
                        </FadeInItem>
                    </StaggerContainer>

                    <FadeIn delay={0.2} className="bg-primary/5 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-primary/10">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl font-bold font-heading text-navy mb-4">Partner With Us</h2>
                            <p className="text-gray-700 text-lg">
                                Looking for a reliable manufacturing partner in India? We offer competitive pricing for bulk contracts without compromising on quality or compliance.
                            </p>
                        </div>
                        <Link href="/contact" className={buttonVariants({ size: "lg" })} >
                            Start a Partnership
                        </Link>
                    </FadeIn>
                </Container>
            </section>
        </div>
    );
}
