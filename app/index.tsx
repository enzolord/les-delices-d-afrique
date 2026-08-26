import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { PageHead } from '@/components/seo/PageHead';
import { routesSeo } from '@/data/seo';
import { Hero } from '@/components/home/Hero';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { FeaturedDishes } from '@/components/home/FeaturedDishes';
import { AboutPreview } from '@/components/home/AboutPreview';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { GalleryPreview } from '@/components/home/GalleryPreview';
import { HoursLocation } from '@/components/home/HoursLocation';
import { ContactCTA } from '@/components/home/ContactCTA';

export default function HomeScreen() {
  return (
    <PageShell>
      <PageHead seo={routesSeo.home} />
      <Hero />
      <WhyChooseUs />
      <FeaturedDishes />
      <AboutPreview />
      <ServicesPreview />
      <GalleryPreview />
      <HoursLocation />
      <ContactCTA />
    </PageShell>
  );
}
