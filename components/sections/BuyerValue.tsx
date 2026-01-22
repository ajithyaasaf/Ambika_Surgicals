import { Container } from '@/components/ui/container';
import { Building2, Truck, Globe2 } from 'lucide-react';
import FadeIn, { StaggerContainer, FadeInItem } from '@/components/animations/FadeIn';

const VALUES = [
    {
        icon: Building2,
        title: 'Hospitals & Clinics',
        description: 'Reduce post-operative risks with our strictly sterilized, lint-free dressings. Consistent absorbency and reliable supply chains ensure patient safety comes first.',
        benefit: 'Focus on Patient Safety',
    },
    {
        icon: Truck,
        title: 'Distributors',
        description: 'Eliminate returns and complaints. Our standardized manufacturing process ensures every batch meets specifications, protecting your reputation.',
        benefit: 'Reliable Inventory Quality',
    },
    {
        icon: Globe2,
        title: 'Pan-India Supply',
        description: 'Delivering excellence across India. Our robust logistics network ensures timely bulk delivery to hospitals and distributors in every state.',
        benefit: 'Nationwide Reach',
    },
];

export default function BuyerValue() {
    return (
        <section className="py-20 bg-white">
            <Container>
                <FadeIn className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary font-bold tracking-wide uppercase text-sm">Why Partner With Us</span>
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy mt-2 mb-4">
                        Trusted by Hospitals, Clinics & Distributors
                    </h2>
                    <p className="text-gray-600 text-lg">
                        We understand what healthcare providers need: reliable bandages, consistent quality, and timely delivery.
                        Our manufacturing processes are designed to meet these critical requirements.
                    </p>
                </FadeIn>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {VALUES.map((item, idx) => (
                        <FadeInItem key={idx}>
                            <div className="bg-neutral-light p-8 rounded-xl border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-lg transition-all duration-300 h-full">
                                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                                    <item.icon size={32} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-bold text-navy mb-3">{item.title}</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {item.description}
                                </p>
                                <div className="inline-block px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-navy uppercase tracking-wider">
                                    {item.benefit}
                                </div>
                            </div>
                        </FadeInItem>
                    ))}
                </StaggerContainer>
            </Container>
        </section>
    );
}
