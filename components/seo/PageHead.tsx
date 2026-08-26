import React from 'react';
import Head from 'expo-router/head';
import { RouteSeo, defaultOgImage, siteName, siteUrl } from '@/data/seo';

interface PageHeadProps {
  seo: RouteSeo;
  ogImage?: string;
}

/**
 * Injecte les balises SEO essentielles pour chaque route (CdC §22) :
 * title, meta description, mots-clés, canonical, Open Graph, Twitter Card.
 * `expo-router/head` ne fonctionne que sur le rendu web — sans effet sur
 * iOS/Android natif.
 */
export function PageHead({ seo, ogImage = defaultOgImage }: PageHeadProps) {
  const canonical = `${siteUrl}${seo.path}`;

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords.length > 0 && <meta name="keywords" content={seo.keywords.join(', ')} />}
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="restaurant.menu" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="fr_FR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={ogImage} />

      <meta name="geo.region" content="CM-SW" />
      <meta name="geo.placename" content="Douala" />
    </Head>
  );
}
