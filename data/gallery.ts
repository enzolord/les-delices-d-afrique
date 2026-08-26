/**
 * Galerie — CdC §17.
 * ⚠️ Les visuels réels (plats, salle, ambiance, équipe...) doivent être
 * fournis par le client via le Community Manager (CdC §35). En attendant,
 * chaque entrée affiche un espace réservé identifiant clairement la photo
 * à venir, pour ne pas publier de faux visuels du restaurant.
 */
export type GalleryTag = 'plats' | 'salle' | 'ambiance' | 'evenements' | 'shawamar';

export interface GalleryItem {
  id: string;
  tag: GalleryTag;
  label: string;
}

export const galleryTags: { id: GalleryTag | 'tous'; label: string }[] = [
  { id: 'tous', label: 'Tout' },
  { id: 'plats', label: 'Nos plats' },
  { id: 'salle', label: 'La salle' },
  { id: 'ambiance', label: 'Ambiance' },
  { id: 'evenements', label: 'Événements' },
  { id: 'shawamar', label: 'Équipe' },
];

export const galleryItems: GalleryItem[] = [
  { id: 'g1', tag: 'plats', label: 'Riz sénégalais au poisson' },
  { id: 'g2', tag: 'plats', label: 'Plantain & poulet rôti' },
  { id: 'g3', tag: 'salle', label: "Salle du restaurant, Akwa" },
 // { id: 'g4', tag: 'ambiance', label: 'Ambiance en soirée' },
  { id: 'g5', tag: 'plats', label: 'Ndolé aux crevettes' },
  { id: 'g6', tag: 'salle', label: 'Table dressée' },
  //{ id: 'g7', tag: 'evenements', label: 'Service traiteur — anniversaire' },
  { id: 'g8', tag: 'plats', label: 'Jus de baobab & foléré' },
  { id: 'g9', tag: 'shawamar', label: 'Shawamar delicieux' },
];
