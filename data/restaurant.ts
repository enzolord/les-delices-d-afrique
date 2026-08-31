/**
 * Informations générales du restaurant.
 
 */

export const restaurant = {
  name: "Les Délices d'Afrique",
  tagline: 'Le haut standing à prix abordable.',
  intro:
    'Découvrez une cuisine de qualité dans un cadre confortable et chaleureux, au cœur de Douala.',
  positioning: 'Haut standing à prix abordable',

  // adresse 
  addressLine: 'Bonadibong en face le MIRADOR, Douala — Cameroun',
  addressDetail: 'Adresse précise à confirmer par le Community Manager',
  city: 'Douala',
  district: 'Bonadibong',
  country: 'Cameroun',
  description: 'RESTAURANT SENEGALAIS',

  //coordonnées GPS 
  geo: {
    latitude: 4.0431306,
    longitude:  9.6963773,
  },

  // Requête utilisée pour Google Maps tant que l'adresse précise
  // et/ou le lien Google Business Profile ne sont pas fournis.
  mapsQuery: "Les Délices d'Afrique, Bonadibong, Douala, Cameroun",

  // numéros officiels du restaurant
  phoneDisplay: '+237 691 240 353',
  whatsappNumber: '+237 691 240 353',
  email: 'contact@lesdelicesdafrique.online',

  hours: {
    label: 'Ouvert tous les jours',
    range: '08h00 – 00h00',
    days: 'Lundi – Dimanche',
    note: '7j/7, y compris jours fériés',
  },

  social: {
    // liens reseaux sociaux
    facebook: 'https://www.facebook.com/lesdelicesdafriquedouala',
    instagram: 'https://www.instagram.com/lesdelicesdafriquedouala',
    tiktok: 'https://www.tiktok.com/@lesdelicesdafriquedouala',
    googleBusiness: 'https://maps.app.goo.gl/YZskHtiANoQdtKe66?g_st=ic',
  },

  whyChooseUs: [
    {
      id: 'confort',
      title: 'Confort',
      description: "Un cadre agréable et soigné pour profiter pleinement de chaque repas.",
      icon: 'sofa' as const,
    },
    {
      id: 'qualite',
      title: 'Qualité',
      description: 'Une cuisine préparée avec soin, des produits frais et des plats savoureux.',
      icon: 'chef-hat' as const,
    },
    {
      id: 'accueil',
      title: 'Accueil chaleureux',
      description: 'Une expérience humaine et conviviale, du premier au dernier instant.',
      icon: 'heart-handshake' as const,
    },
  ],

  about: {
    title: "L'histoire de la maison",

    paragraphs: [
      "Les Délices d'Afrique est né d'une conviction simple : la grande cuisine camerounaise mérite un cadre à sa hauteur, sans jamais devenir inaccessible.",
      "Ici, chaque plat est préparé avec des produits choisis avec soin, dans le respect des recettes qui font la richesse de la table africaine.",
      "Que ce soit pour un déjeuner en famille, un dîner entre amis ou un événement à célébrer, notre équipe vous reçoit avec la même attention chaleureuse.",
    ],
    values: ['Qualité des produits', 'Générosité des portions', 'Accueil sincère', 'Cadre soigné'],
  },
} as const;

export type WhyChooseUsItem = (typeof restaurant.whyChooseUs)[number];
