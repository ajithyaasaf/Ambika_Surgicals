import { Container } from '@/components/ui/container';
import { Building2, Truck, Globe2 } from 'lucide-react';

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
        title: 'Exporters',
        description: 'Seemless documentation and packaging that meets global standards. We understand the nuances of international compliance and timely shipments.',
        benefit: 'Export-Ready Compliance',
    },
];

export default function BuyerValue() {
    return (
        <section className="py-20 bg-white">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary font-bold tracking-wide uppercase text-sm">Why Partner With Us</span>
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy mt-2 mb-4">
                        Built for the Healthcare Supply Chain
                    </h2>
                    <p className="text-gray-600 text-lg">
                        We understand the distinct pressure points of the medical industry.
                        Our processes are improved to solve them.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {VALUES.map((item, idx) => (
                        <div key={idx} className="bg-neutral-light p-8 rounded-xl border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-lg transition-all duration-300">
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
                    ))}
                </div>
            </Container>
        </section>
    );
}
