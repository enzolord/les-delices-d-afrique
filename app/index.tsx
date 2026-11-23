import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import Head from 'expo-router/head';
import { PageHead } from '@/components/seo/PageHead';
import { restaurantImageUri } from '@/utils/images';
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
      <Head>
        {/* Photo principale (LCP) : téléchargée en priorité, avant le JavaScript */}
        <link rel="preload" as="image" href={restaurantImageUri('hero')} fetchPriority="high" />
      </Head>
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
