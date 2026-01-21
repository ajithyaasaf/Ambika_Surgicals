'use client';

import { useState } from 'react';
import { login } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';

export default function AdminLogin() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError('');

        const result = await login(formData); // Server action

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-neutral-light relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-navy/5 rounded-full blur-3xl opacity-50" />
            </div>

            <FadeIn className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-white/50 relative z-10">
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <div className="relative w-48 h-16">
                            <Image
                                src="/images/Logo.png"
                                alt="Ambika Surgicals"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-navy font-heading">
                        Admin Portal
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Secure access for authorized personnel only
                    </p>
                </div>
                <form action={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-navy mb-1">
                                Password
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white/50"
                                placeholder="Enter your access key"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-600 text-sm text-center font-medium bg-red-50 p-3 rounded-lg border border-red-100 animate-pulse">
                            {error}
                        </div>
                    )}

                    <div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            {loading ? 'Verifying...' : 'Access Dashboard'}
                        </Button>
                    </div>
                </form>

                <div className="text-center mt-6">
                    <p className="text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} Ambika Surgicals. All rights reserved.
                    </p>
                </div>
            </FadeIn>
        </div>
    );
}
