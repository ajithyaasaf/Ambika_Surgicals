'use server';

import { contactFormSchema, type ActionResponse } from '@/lib/validations';
import { db } from '@/lib/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Server Action for Contact Form Submission
 * In production, this should:
 * 1. Send email via SendGrid/Resend/Nodemailer
 * 2. Store in database
 * 3. Send confirmation email to user
 */
export async function submitContactForm(formData: FormData): Promise<ActionResponse> {
    try {
        // Extract form data
        const rawData = {
            name: formData.get('name'),
            company: formData.get('company'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message'),
        };

        // Validate using Zod
        const validatedData = contactFormSchema.parse(rawData);

        // Store in Firestore
        await addDoc(collection(db, 'contact_submissions'), {
            ...validatedData,
            timestamp: serverTimestamp(),
            status: 'new', // new, read, replied
            type: 'contact',
        });

        // TODO: In production, implement email sending
        // Example with Resend:
        // await resend.emails.send({
        //   from: 'noreply@ambikasurgicals.com',
        //   to: 'sales@ambikasurgicals.com',
        //   subject: `New Inquiry from ${validatedData.name}`,
        //   html: generateEmailTemplate(validatedData)
        // });

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Log for development
        console.log('Contact Form Submission:', validatedData);

        return {
            success: true,
            message: 'Thank you for your inquiry! Our team will contact you within 24 hours.',
        };
    } catch (error) {
        // Handle Zod validation errors
        if (error instanceof Error && error.name === 'ZodError') {
            const zodError = error as any;
            return {
                success: false,
                message: 'Please check your form for errors.',
                errors: zodError.flatten().fieldErrors,
            };
        }
        // Handle other errors
        console.error('Contact form error:', error);
        return {
            success: false,
            message: 'An error occurred. Please try again or contact us directly.',
        };
    }
}

/**
 * Server Action for Quote/Inquiry Submission
 * Handles bulk quote requests with product list and quantities
 */
export async function submitQuoteRequest(
    formData: FormData,
    productItems: Array<{ id: string; quantity: number }>
): Promise<ActionResponse> {
    try {
        const rawData = {
            name: formData.get('name'),
            company: formData.get('company'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message'),
        };

        const validatedData = contactFormSchema.parse(rawData);

        // Store in Firestore
        await addDoc(collection(db, 'contact_submissions'), {
            ...validatedData,
            products: productItems, // Now includes { id, quantity }
            timestamp: serverTimestamp(),
            status: 'new',
            type: 'quote',
        });

        // TODO: Send email with product list
        console.log('Quote Request:', { ...validatedData, products: productItems });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
            success: true,
            message: 'Quote request submitted successfully! We will send you a detailed quotation within 48 hours.',
        };
    } catch (error) {
        if (error instanceof Error && error.name === 'ZodError') {
            const zodError = error as any;
            return {
                success: false,
                message: 'Please check your form for errors.',
                errors: zodError.flatten().fieldErrors,
            };
        }

        console.error('Quote request error:', error);
        return {
            success: false,
            message: 'Failed to submit quote request. Please try again.',
        };
    }
}
