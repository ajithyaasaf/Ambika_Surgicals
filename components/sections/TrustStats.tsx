import { Container } from '@/components/ui/container';
import { Clock, Leaf, Shield, Users } from 'lucide-react';
import { StaggerContainer, FadeInItem } from '@/components/animations/FadeIn';

const STATS = [
    { value: '15+', label: 'Years of Experience', Icon: Clock },
    { value: '100%', label: 'Pure Cotton', Icon: Leaf },
    { value: 'ISO 13485', label: 'Quality Certified', Icon: Shield },
    { value: '50+', label: 'Happy Clients', Icon: Users },
];

export default function TrustStats() {
    return (
        <section className="py-12 bg-white border-y border-gray-100">
            <Container>
                <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {STATS.map((stat, idx) => {
                        const Icon = stat.Icon;
                        return (
                            <FadeInItem key={idx} className="text-center">
                                <div className="flex justify-center mb-3">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-navy font-heading mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                            </FadeInItem>
                        );
                    })}
                </StaggerContainer>
            </Container>
        </section>
    );
}
