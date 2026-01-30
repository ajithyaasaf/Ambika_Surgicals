'use client';

import * as React from 'react';
import { useFormStatus } from 'react-dom';
import { submitContactForm, submitQuoteRequest } from '@/app/actions/contact';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

interface ContactFormProps {
    isQuoteRequest?: boolean;
    productItems?: Array<{ id: string; quantity: number }>;
    onSuccess?: () => void;
}

function SubmitButton({ isQuote }: { isQuote?: boolean }) {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            className="w-full"
            disabled={pending}
            isLoading={pending}
        >
            {pending ? 'Sending...' : (isQuote ? 'Submit Quote Request' : 'Send Message')}
        </Button>
    );
}

export default function ContactForm({ isQuoteRequest = false, productItems = [], onSuccess }: ContactFormProps) {
    const [startTime] = React.useState(Date.now());
    const [state, setState] = React.useState<{
        success?: boolean;
        message?: string;
        errors?: Record<string, string[]>;
    }>({});

    const formRef = React.useRef<HTMLFormElement>(null);

    async function handleSubmit(formData: FormData) {
        let result;

        if (isQuoteRequest && productItems.length > 0) {
            result = await submitQuoteRequest(formData, productItems);
        } else {
            result = await submitContactForm(formData);
        }

        setState(result);

        if (result.success) {
            formRef.current?.reset();
            if (onSuccess) onSuccess();
            // Auto-clear success message after 5 seconds
            setTimeout(() => setState({}), 5000);
        }
    }

    return (
        <form ref={formRef} action={handleSubmit} className="space-y-4">
            {/* Success/Error Messages */}
            {state.message && (
                <div
                    className={`p-4 rounded-lg flex items-start gap-3 ${state.success
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                        }`}
                >
                    {state.success ? (
                        <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                    ) : (
                        <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm font-medium">{state.message}</p>
                </div>
            )}

            {/* Name Field */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Enter your name"
                />
                {state.errors?.name && (
                    <p className="text-red-600 text-xs mt-1">{state.errors.name[0]}</p>
                )}
            </div>

            {/* Company Field */}
            <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Enter company name"
                />
                {state.errors?.company && (
                    <p className="text-red-600 text-xs mt-1">{state.errors.company[0]}</p>
                )}
            </div>

            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Enter email address"
                />
                {state.errors?.email && (
                    <p className="text-red-600 text-xs mt-1">{state.errors.email[0]}</p>
                )}
            </div>

            {/* Phone Field */}
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Enter phone number"
                />
                {state.errors?.phone && (
                    <p className="text-red-600 text-xs mt-1">{state.errors.phone[0]}</p>
                )}
            </div>

            {/* Message Field */}
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                    placeholder="Enter your message"
                />
                {state.errors?.message && (
                    <p className="text-red-600 text-xs mt-1">{state.errors.message[0]}</p>
                )}
            </div>

            {/* Anti-spam Fields */}
            <input type="text" name="website_url" className="hidden" tabIndex={-1} autoComplete="off" />
            <input type="hidden" name="_t" value={startTime} />

            <SubmitButton isQuote={isQuoteRequest} />
        </form>
    );
}
