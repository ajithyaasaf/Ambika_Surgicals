import { Container } from '@/components/ui/container';
import FadeIn from '@/components/animations/FadeIn';

export default function HomeIntro() {
    return (
        <section className="py-16 md:py-20 bg-white">
            <Container>
                <FadeIn className="text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading text-navy mb-6">
                        Premium Surgical Bandages & Dressings Manufacturer
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        ISO-certified surgical dressing materials manufactured in Rajapalayam, India. 
                        Trusted by hospitals, clinics, and distributors worldwide for quality, reliability, and export-grade standards.
                    </p>
                </FadeIn>
            </Container>
        </section>
    );
}
