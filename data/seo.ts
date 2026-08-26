import { restaurant } from './restaurant';

/**
 * Métadonnées SEO par page — orientées recherche locale
 * (Douala, Akwa, livraison, traiteur) comme demandé au cahier
 * des charges §22 ("le référencement devra être orienté vers les
 * recherches locales").
 *
 * Le domaine réel (siteUrl) devra être mis à jour une fois le nom
 * de domaine définitif choisi et déployé.
 */

export const siteUrl = 'https://www.lesdelicesdafrique.online';
export const siteName = "Les Délices d'Afrique";
export const defaultOgImage = `${siteUrl}/og-image.jpg`;

export interface RouteSeo {
  path: string;
  title: string;
  description: string;
  keywords: string[];
}

export const routesSeo: Record<string, RouteSeo> = {
  home: {
    path: '/',
    title: "Les Délices d'Afrique — Restaurant à Akwa, Douala | Livraison & Traiteur",
    description:
      "Restaurant Les Délices d'Afrique à Akwa, Douala : cuisine camerounaise haut standing à prix abordable. Repas sur place, livraison à domicile et traiteur pour mariages, anniversaires, baptêmes. Ouvert 7j/7 de 8h à minuit.",
    keywords: [
      'restaurant Douala',
      'restaurant Bonadibong',
      'restaurant Akwa Douala',
      'livraison repas Douala',
      'traiteur Douala',
      'cuisine camerounaise Douala',
      'riz sénégalais Douala',
      'restaurant haut standing Douala',
    ],
  },
  restaurant: {
    path: '/le-restaurant',
    title: "Le restaurant — Les Délices d'Afrique | Bonadibong, Douala",
    description:
      "Découvrez l'histoire, le cadre et les valeurs du restaurant Les Délices d'Afrique à Akwa, Douala : une cuisine camerounaise soignée dans une ambiance chaleureuse et élégante.",
    keywords: ['restaurant Akwa', 'restaurant camerounais Douala', 'cadre restaurant Douala'],
  },
  menu: {
    path: '/menu',
    title: "Notre menu — Riz sénégalais, plantain, spaghetti & plus | Les Délices d'Afrique",
    description:
      "Consultez le menu complet du restaurant Les Délices d'Afrique à Douala : riz sénégalais, pommes de terre sautées, plantain, spaghetti, jus naturels, kossam et spéciaux du week-end.",
    keywords: [
      'menu restaurant Douala',
      'riz sénégalais Douala',
      'plantain viande Douala',
      'spaghetti sauté Douala',
      'jus naturels Douala',
      'kossam Douala',
    ],
  },
  services: {
    path: '/services',
    title: "Nos services — Livraison, traiteur mariages & anniversaires | Les Délices d'Afrique",
    description:
      "Livraison à domicile à Douala, repas sur place à Akwa et service traiteur pour mariages, anniversaires et baptêmes. Découvrez tous les services du restaurant Les Délices d'Afrique.",
    keywords: [
      'livraison repas Douala',
      'traiteur mariage Douala',
      'traiteur anniversaire Douala',
      'traiteur baptême Douala',
      'restaurant livraison Akwa',
    ],
  },
  gallery: {
    path: '/galerie',
    title: "Galerie photos — Les Délices d'Afrique | Restaurant Akwa, Douala",
    description:
      "Découvrez en images l'ambiance, la salle et les plats du restaurant Les Délices d'Afrique à Akwa, Douala, avant votre visite.",
    keywords: ['photos restaurant Douala', 'ambiance restaurant Akwa'],
  },
  contact: {
    path: '/contact',
    title: "Contact — Les Délices d'Afrique | Akwa, Douala, appel & WhatsApp",
    description:
      "Contactez le restaurant Les Délices d'Afrique à Akwa, Douala : téléphone, WhatsApp, itinéraire Google Maps et horaires d'ouverture 7j/7 de 8h à minuit.",
    keywords: [
      'contact restaurant Douala',
      'téléphone restaurant Akwa',
      'whatsapp restaurant Douala',
      'itinéraire restaurant Akwa',
    ],
  },
  legal: {
    path: '/mentions-legales',
    title: `Mentions légales | ${restaurant.name}`,
    description: `Mentions légales du site du restaurant ${restaurant.name} à Akwa, Douala.`,
    keywords: [],
  },
  privacy: {
    path: '/politique-confidentialite',
    title: `Politique de confidentialité | ${restaurant.name}`,
    description: `Politique de confidentialité du site du restaurant ${restaurant.name} à Bonadibong, Douala.`,
    keywords: [],
  },
};
