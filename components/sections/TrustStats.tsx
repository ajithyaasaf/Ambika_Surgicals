import { Container } from '@/components/ui/container';
import { Clock, Globe, Shield, Package } from 'lucide-react';

const STATS = [
    { value: '15+', label: 'Years of Experience', Icon: Clock },
    { value: '25+', label: 'Export Destinations', Icon: Globe },
    { value: 'ISO 13485', label: 'Quality Certified', Icon: Shield },
    { value: '100K+', label: 'Units/Month', Icon: Package },
];

export default function TrustStats() {
    return (
        <section className="py-12 bg-white border-y border-gray-100">
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {STATS.map((stat, idx) => {
                        const Icon = stat.Icon;
                        return (
                            <div key={idx} className="text-center">
                                <div className="flex justify-center mb-3">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-navy font-heading mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
