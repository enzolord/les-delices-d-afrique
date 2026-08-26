/**
 * Construit l'URL des images réelles servies depuis le dossier `public/images`.
 * -------------------------------------------------------------------------
 * Fonctionnement : `public/` est copié tel quel à la racine du site lors de
 * l'export web (`npx expo export --platform web`) — c'est déjà le mécanisme
 * utilisé pour `robots.txt` et `sitemap.xml`. Une image placée dans
 * `public/images/menu/rs-poisson.webp` est donc automatiquement servie sur
 * `/images/menu/rs-poisson.webp`, sans configuration supplémentaire.
 *
 * Format : .webp (plus léger qu'un .jpg à qualité équivalente — meilleur
 * pour la vitesse de chargement mobile, un critère important pour le SEO
 * local). Convertissez vos photos avec https://squoosh.app (choisir "WebP").
 *
 * Aucune photo n'est obligatoire : `PlaceholderImage` retombe
 * automatiquement sur le bloc "photo à venir" si le fichier attendu
 * n'existe pas encore (voir `onError` dans `components/ui/PlaceholderImage.tsx`).
 * Vous pouvez donc ajouter vos photos progressivement, une à une.
 *
 * Convention de nommage : le nom de fichier doit correspondre exactement à
 * l'`id` du plat / de l'item de galerie / du service, en `.webp`.
 * Ex. le plat `{ id: 'rs-poisson', ... }` dans data/menu.ts → fichier
 * `public/images/menu/rs-poisson.webp`.
 *
 * ⚠️ Natif (iOS/Android) : le composant `Image` de React Native affiche le
 * .webp sans problème sur Android. Sur iOS, le support du .webp statique est
 * géré nativement depuis longtemps par Expo/React Native — aucune action
 * requise. Si un jour un souci d'affichage natif apparaissait sur une très
 * ancienne version d'iOS, la solution serait de fournir une version .jpg de
 * secours à cette même fonction.
 */

export function menuImageUri(id: string) {
  return `/images/menu/${id}.webp`;
}

export function galleryImageUri(id: string) {
  return `/images/gallery/${id}.webp`;
}

export function serviceImageUri(id: string) {
  return `/images/services/${id}.webp`;
}

/**
 * Photos "génériques" du restaurant qui ne sont pas liées à un item de
 * `data/*.ts` précis (hero, salle, chef...). Noms de fichiers fixes,
 * volontairement centralisés ici pour que toute l'app utilise les mêmes.
 */
export const restaurantPhotoKeys = [
  'hero', // Photo signature affichée en grand sur l'accueil
  'interieur', // Salle / intérieur, utilisé sur l'accueil et /le-restaurant
  'chef', // Chef en cuisine, page /le-restaurant
  'salle', // Salle du restaurant, page /le-restaurant
  'ambiance', // Ambiance / convivialité, page /le-restaurant
] as const;

export type RestaurantPhotoKey = (typeof restaurantPhotoKeys)[number];

export function restaurantImageUri(key: RestaurantPhotoKey) {
  return `/images/restaurant/${key}.webp`;
}
