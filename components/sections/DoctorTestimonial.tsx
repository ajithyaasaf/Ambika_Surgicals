'use client';

import { Container } from '@/components/ui/container';
import FadeIn from '@/components/animations/FadeIn';

export default function DoctorTestimonial() {
    return (
        <section className="py-20 bg-white">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Video Side */}
                    <FadeIn direction="right" className="order-last lg:order-first">
                        <div className="relative aspect-square max-w-lg mx-auto bg-gray-100 rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                            <video
                                className="w-full h-full object-cover"
                                src="/Videos/Testimonial.mp4"
                                controls
                                preload="metadata"
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </FadeIn>

                    {/* Text Side */}
                    <FadeIn className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-sm font-medium">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Trusted by Experts
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-navy font-heading leading-tight">
                            Recommended by <br />
                            <span className="text-primary">Leading Surgeons</span>
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            "Quality is non-negotiable in surgery. Ambika Surgicals consistently delivers the sterility and absorbency standards we need for patient safety. Their cotton products are among the best I've used."
                        </p>

                        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                            <div>
                                <h4 className="font-bold text-navy text-lg">Dr. A. S. Reyas</h4>
                                <p className="text-gray-500 text-sm">Managing Director & Chief Surgeon</p>
                                <p className="text-primary text-sm font-medium">M.S. Ortho</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </Container>
        </section>
    );
}
