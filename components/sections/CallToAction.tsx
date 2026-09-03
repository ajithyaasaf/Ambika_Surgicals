import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Truck, Award, MessageCircle } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import { COMPANY_INFO } from '@/lib/constants';

interface CallToActionProps {
    title?: string;
    description?: string;
}

export default function CallToAction({
    title = "Ready to Upgrade Your Hospital's Surgical Dressing Supplies?",
    description = "Partner directly with an ISO-certified manufacturer in Rajapalayam. We provide export-grade cotton products, hospital tender supplies, and competitive bulk pricing."
}: CallToActionProps) {
    const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}?text=${encodeURIComponent("Hello Ambika Surgicals, I would like to inquire about bulk surgical dressing materials for our hospital/distribution network.")}`;

    return (
        <section className="py-20 bg-gradient-to-br from-navy via-navy to-navy-light text-white relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <Container className="relative z-10">
                <FadeIn className="max-w-3xl mx-auto text-center">
                    <span className="inline-block px-4 py-1.5 bg-white/10 text-primary-light border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
                        Direct Manufacturer Sourcing
                    </span>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-6 leading-tight">
                        {title}
                    </h2>

                    <p className="text-lg text-gray-300 mb-10 leading-relaxed">
                        {description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/products" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto font-bold shadow-xl px-8 py-6 text-base">
                                <span>Browse Product Catalog</span>
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>

                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-3.5 rounded-md font-bold shadow-lg transition-colors text-base"
                        >
                            <MessageCircle className="w-5 h-5" />
                            <span>Quick Chat on WhatsApp</span>
                        </a>
                    </div>

                    {/* Trust Highlights */}
                    <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-300">
                        <div className="flex items-center justify-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-primary-light shrink-0" />
                            <span>100% Pure Virgin Cotton</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <Award className="w-4 h-4 text-primary-light shrink-0" />
                            <span>ISO 13485 Certified Facility</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <Truck className="w-4 h-4 text-primary-light shrink-0" />
                            <span>Pan-India & Export Dispatch</span>
                        </div>
                    </div>
                </FadeIn>
            </Container>
        </section>
    );
}
