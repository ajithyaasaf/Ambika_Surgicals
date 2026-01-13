import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

export default function Hero() {
    return (
        <section className="relative bg-navy py-20 md:py-32 overflow-hidden">
            {/* Background Pattern - Subtle */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
            </div>

            <Container className="relative z-10 text-center md:text-left">
                <div className="max-w-3xl">
                    <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary-light mb-6 border border-primary/20">
                        Export-Quality Medical Textiles from India
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6 leading-tight">
                        Precision. Hygiene. <br />
                        <span className="text-primary-light">Manufacturing Reliability.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                        Ambika Surgicals is your trusted partner for high-grade surgical dressing materials.
                        Reducing procurement risk for hospitals, exporters, and distributors worldwide.
                    </p>


                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto text-lg")}>
                            Request a Quote
                        </Link>
                        <Link
                            href="/products"
                            className={cn(buttonVariants({ size: "lg", variant: "outline" }), "w-full sm:w-auto text-lg border-gray-500 text-gray-300 hover:bg-white/10 hover:text-white")}
                        >
                            View Products
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}
