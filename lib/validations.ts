import { z } from 'zod';

// Contact Form Schema
export const contactFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name is too long'),
    company: z.string().min(2, 'Company name is required').max(100),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15),
    message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Quote Form Schema (message optional for quote requests to minimize friction)
export const quoteFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name is too long'),
    company: z.string().min(2, 'Hospital / Company name is required').max(100),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15),
    message: z.string().max(1000).optional().transform((val) => val || ''),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

// Server Action Response Type
export interface ActionResponse {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
}
