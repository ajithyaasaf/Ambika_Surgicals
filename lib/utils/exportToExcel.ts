'use client';

import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { PRODUCTS } from '@/lib/data/products';

interface Submission {
    id: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message?: string;
    status: 'new' | 'read' | 'replied';
    timestamp: any;
    type?: 'contact' | 'quote';
    products?: string[] | Array<{ id: string; quantity: number }>;
}

export function exportToExcel(submissions: Submission[]) {
    // Transform data for Excel
    const excelData = submissions.map((sub) => {
        // Format products nicely with actual names
        let productsText = '';
        let quantitiesText = '';

        if (sub.products && sub.products.length > 0) {
            const productDetails = sub.products.map((item) => {
                const productId = typeof item === 'string' ? item : item.id;
                const quantity = typeof item === 'string' ? 1 : item.quantity;

                // Look up the actual product name
                const product = PRODUCTS.find(p => p.id === productId);
                const productName = product?.name || productId.replace(/-/g, ' ');

                return {
                    id: productId,
                    name: productName,
                    qty: quantity
                };
            });

            productsText = productDetails.map(p => p.name).join(', ');
            quantitiesText = productDetails.map(p => `${p.name}: ${p.qty}`).join(', ');
        }

        return {
            'Date': sub.timestamp ? format(new Date(sub.timestamp), 'yyyy-MM-dd HH:mm:ss') : '',
            'Type': sub.type === 'quote' ? 'Quote Request' : 'General Contact',
            'Status': sub.status.toUpperCase(),
            'Name': sub.name,
            'Company': sub.company || 'N/A',
            'Email': sub.email,
            'Phone': sub.phone || 'N/A',
            'Message': sub.message || '',
            'Products': productsText || 'N/A',
            'Product Quantities': quantitiesText || 'N/A',
            'Submission ID': sub.id,
        };
    });

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const colWidths = [
        { wch: 20 }, // Date
        { wch: 15 }, // Type
        { wch: 10 }, // Status
        { wch: 20 }, // Name
        { wch: 25 }, // Company
        { wch: 30 }, // Email
        { wch: 15 }, // Phone
        { wch: 50 }, // Message
        { wch: 40 }, // Products
        { wch: 40 }, // Product Quantities
        { wch: 25 }, // Submission ID
    ];
    ws['!cols'] = colWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Submissions');

    // Generate filename with current date
    const filename = `ambika-submissions-${format(new Date(), 'yyyy-MM-dd')}.xlsx`;

    // Download file
    XLSX.writeFile(wb, filename);
}
