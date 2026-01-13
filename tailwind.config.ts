import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#007BFF', // Medical Blue
                    dark: '#0056b3',
                    light: '#3395ff',
                },
                navy: {
                    DEFAULT: '#0F2A44', // Dark Navy
                    light: '#1a4369',
                },
                neutral: {
                    gray: '#6B7280',
                    light: '#F5F7FA', // Background
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)'],
                heading: ['var(--font-poppins)'],
            },
            container: {
                center: true,
                padding: '1rem',
                screens: {
                    '2xl': '1280px',
                },
            },
        },
    },
    plugins: [],
};
export default config;
