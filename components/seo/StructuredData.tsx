import React from 'react';
import Head from 'expo-router/head';
import { restaurant } from '@/data/restaurant';
import { siteUrl } from '@/data/seo';
import { menuItems } from '@/data/menu';

/**
 * Données structurées Schema.org de type Restaurant (CdC §23) :
 * nom, logo, adresse, téléphone, horaires, coordonnées géographiques,
 * type de cuisine, gamme de prix, menu, URL.
 *
 * ⚠️ Les valeurs proviennent de data/restaurant.ts — à maintenir à jour
 * dès que les informations officielles sont validées par le client.
 */
export function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.name,
    image: `${siteUrl}/og-image.jpg`,
    '@id': siteUrl,
    url: siteUrl,
    telephone: restaurant.phoneDisplay,
    servesCuisine: ['Camerounaise', 'Africaine'],
    priceRange: '500 FCFA – 3000 FCFA',
    address: {
      '@type': 'PostalAddress',
      streetAddress: restaurant.addressLine,
      addressLocality: restaurant.city,
      addressRegion: 'Littoral',
      addressCountry: 'CM',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: restaurant.geo.latitude,
      longitude: restaurant.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '23:59',
      },
    ],
    menu: `${siteUrl}/menu`,
    hasMenu: {
      '@type': 'Menu',
      name: 'Menu — Les Délices d\u2019Afrique',
      hasMenuSection: [
        {
          '@type': 'MenuSection',
          name: 'Spéciaux du week-end',
          hasMenuItem: menuItems
            .filter((i) => i.categoryId === 'weekend')
            .map((i) => ({
              '@type': 'MenuItem',
              name: i.name,
              offers: i.price
                ? { '@type': 'Offer', price: i.price, priceCurrency: 'XAF' }
                : undefined,
            })),
        },
      ],
    },
    acceptsReservations: 'True',
    servesDelivery: true,
  };

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Head>
  );
}
