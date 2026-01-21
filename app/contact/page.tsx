import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import ContactForm from '@/components/forms/ContactForm';
import { COMPANY_INFO } from '@/lib/constants';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with Ambika Surgicals. Request a quote for bulk surgical dressing materials. Based in Rajapalayam, Tamil Nadu.',
};

export default function ContactPage() {
    return (
        <div className="bg-neutral-light min-h-screen">
            <section className="bg-navy py-16 text-center">
                <Container>
                    <FadeIn delay={0.1}>
                        <h1 className="text-4xl font-bold font-heading text-white mb-4">Contact & Inquiries</h1>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Reach out to our sales team for bulk quotes, export inquiries, or manufacturing partnerships.
                        </p>
                    </FadeIn>
                </Container>
            </section>

            <Container className="py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Details */}
                    <div className="lg:col-span-1 space-y-8">
                        <FadeIn delay={0.2}>
                            <h2 className="text-2xl font-bold text-navy font-heading mb-6">Head Office</h2>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <MapPin className="w-6 h-6 text-primary mt-1 shrink-0" />
                                    <div className="ml-4">
                                        <h3 className="font-semibold text-navy">Address</h3>
                                        <p className="text-gray-600 mt-1 leading-relaxed">{COMPANY_INFO.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Phone className="w-6 h-6 text-primary mt-1 shrink-0" />
                                    <div className="ml-4 space-y-3">
                                        <h3 className="font-semibold text-navy">Phone</h3>
                                        {COMPANY_INFO.contactPersons?.map((person, index) => (
                                            <div key={index}>
                                                <p className="font-medium text-navy">{person.name}</p>
                                                <p className="text-gray-600">{person.phone}</p>
                                            </div>
                                        ))}
                                        <p className="text-sm text-gray-500 mt-1 pt-1 border-t border-gray-100">Mon-Sat, 9am - 7pm IST</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Mail className="w-6 h-6 text-primary mt-1 shrink-0" />
                                    <div className="ml-4">
                                        <h3 className="font-semibold text-navy">Email</h3>
                                        <p className="text-gray-600 mt-1">{COMPANY_INFO.email}</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Google Map */}
                        <FadeIn delay={0.3} className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden relative shadow-sm">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15730.088818556738!2d77.54580665!3d9.4533066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06e62555555555%3A0x1234567890abcdef!2sRajapalayam%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0"
                            />
                        </FadeIn>
                    </div>

                    {/* Contact Form */}
                    <FadeIn delay={0.4} className="lg:col-span-2">
                        <ContactForm />
                    </FadeIn>
                </div>
            </Container>
        </div>
    );
}
