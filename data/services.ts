export type ServiceId = 'sur-place' | 'livraison' | 'mariages' | 'anniversaires' | 'baptemes';

export interface Service {
  id: ServiceId;
  title: string;
  shortDescription: string;
  description: string;
  icon: 'utensils' | 'bike' | 'gem' | 'party-popper' | 'church';
  ctaLabel: string;
}

export const services: Service[] = [
  {
    id: 'sur-place',
    title: 'Repas sur place',
    shortDescription: 'Une salle confortable pour déjeuner ou dîner en toute tranquillité.',
    description:
      "Installez-vous dans un cadre chaleureux et soigné, pensé pour les familles, les couples, les groupes d'amis ou un repas en solo. Notre équipe vous accueille du matin jusqu'à minuit, 7 jours sur 7.",
    icon: 'utensils',
    ctaLabel: 'Réserver une table',
  },
  {
    id: 'livraison',
    title: 'Livraison à domicile',
    shortDescription: 'Le menu Les Délices d\u2019Afrique livré chez vous, à Douala.',
    description:
      "Faites-vous livrer vos plats préférés sans quitter la maison ou le bureau. Contactez-nous par téléphone ou WhatsApp pour passer commande : notre équipe confirme votre plat, le montant et le délai de livraison.",
    icon: 'bike',
    ctaLabel: 'Demander une livraison',
  },
  {
    id: 'mariages',
    title: 'Mariages',
    shortDescription: 'Un service traiteur élégant pour sublimer votre grand jour.',
    description:
      "Confiez-nous la restauration de votre mariage : menus personnalisés, présentation soignée et accompagnement pour que vos invités vivent une expérience culinaire à la hauteur de l'événement.",
    icon: 'gem',
    ctaLabel: 'Demander un devis',
  },
  {
    id: 'anniversaires',
    title: 'Anniversaires',
    shortDescription: 'Des formules gourmandes pour célébrer petits et grands.',
    description:
      "Que ce soit pour les 7 ans de votre enfant ou les 50 ans d'un proche, nous composons avec vous un menu festif et généreux, adapté au nombre d'invités et à l'ambiance recherchée.",
    icon: 'party-popper',
    ctaLabel: 'Demander un devis',
  },
  {
    id: 'baptemes',
    title: 'Baptêmes',
    shortDescription: 'Un accompagnement traiteur pour vos cérémonies familiales.',
    description:
      "Pour un baptême réussi, laissez-nous prendre en charge la partie restauration : plats traditionnels et présentation soignée, pour un moment de partage sans stress d'organisation.",
    icon: 'church',
    ctaLabel: 'Demander un devis',
  },
];
