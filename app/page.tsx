import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import HomeIntro from '@/components/sections/HomeIntro';
import TrustStats from '@/components/sections/TrustStats';
import CategoryOverview from '@/components/sections/CategoryOverview';
import DoctorTestimonial from '@/components/sections/DoctorTestimonial';
import BuyerValue from '@/components/sections/BuyerValue';

export const metadata: Metadata = {
  title: 'Ambika Surgicals | Surgical Dressing Material Manufacturer India',
  description: 'Ambika Surgicals is a leading manufacturer of surgical dressing materials (gauze, bandages, cotton) in Rajapalayam, India. Export-quality, ISO certified, and bulk supplier.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <HomeIntro />
      <TrustStats />
      <CategoryOverview />
      <DoctorTestimonial />
      <BuyerValue />
    </>
  );
}
