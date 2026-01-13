import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Privacy Policy for Ambika Surgicals.',
};

export default function PrivacyPage() {
    return (
        <div className="bg-white min-h-screen py-16">
            <Container className="max-w-3xl">
                <h1 className="text-3xl font-bold font-heading text-navy mb-8">Privacy Policy</h1>
                <div className="prose prose-blue max-w-none text-gray-600">
                    <p>Last updated: January 2026</p>
                    <h3>1. Introduction</h3>
                    <p>
                        Ambika Surgicals ("we", "our", or "us") respects your privacy and is committed to protecting it through our compliance with this policy.
                    </p>
                    <h3>2. Information We Collect</h3>
                    <p>
                        We collect information that you provide securely when you:
                        <ul>
                            <li>Request a quote through our website forms.</li>
                            <li>Contact us via email or phone.</li>
                            <li>Download our product resources.</li>
                        </ul>
                        This typically includes your name, business email, company name, and phone number.
                    </p>
                    <h3>3. Use of Information</h3>
                    <p>
                        We use this information strictly to:
                        <ul>
                            <li>Process your inquiry and provide quotations.</li>
                            <li>Coordinate shipping and logistics for orders.</li>
                            <li>Comply with export/import regulations.</li>
                        </ul>
                        We do not sell your personal data to third parties.
                    </p>
                    <h3>4. Contact Us</h3>
                    <p>
                        If you have questions about this policy, please contact us at info@ambikasurgicals.com.
                    </p>
                </div>
            </Container>
        </div>
    );
}
