/**
 * Menu complet — Les Délices d'Afrique
 * -------------------------------------------------
 * Réorganisé en catégories logiques (base / accompagnement) pour une
 * lecture plus naturelle que la liste brute fournie par le client,
 * conformément au cahier des charges §15 ("Le menu doit être agréable
 * à consulter et organisé en catégories selon le contenu réel du
 * restaurant"). Aucun plat, prix ou intitulé n'a été inventé —
 * uniquement reformaté / regroupé pour la lisibilité.
 */

export type MenuCategoryId =
  | 'weekend'
  | 'riz-senegalais'
  | 'spaghetti'
  | 'pommes-de-terre'
  | 'plantain'
  | 'riz-blanc'
  | 'fast-food'
  | 'jus'
  | 'kossam';

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  shortLabel: string;
  description: string;
}

export interface PriceOption {
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  categoryId: MenuCategoryId;
  name: string;
  description?: string;
  /** Renseigné quand un seul prix s'applique */
  price?: number;
  /** Renseigné quand plusieurs formats/prix existent (ex: petit / grand) */
  priceOptions?: PriceOption[];
  /** Choix d'accompagnement proposés pour ce plat */
  choiceOf?: string[];
  badges?: Array<'Spécial week-end' | 'Populaire'>;
}

export const categories: MenuCategory[] = [
  {
    id: 'weekend',
    label: 'Spéciaux du week-end',
    shortLabel: 'Week-end',
    description: "Des grands classiques camerounais, disponibles le temps d'un week-end.",
  },
  {
    id: 'riz-senegalais',
    label: 'Riz sénégalais',
    shortLabel: 'Riz sénégalais',
    description: 'Notre riz sénégalais mijoté, servi avec la protéine de votre choix.',
  },
  {
    id: 'pommes-de-terre',
    label: 'Pommes de terre sautées',
    shortLabel: 'Pommes de terre',
    description: 'Pommes de terre sautées maison, en plat complet avec la garniture de votre choix.',
  },
  {
    id: 'plantain',
    label: 'Plantain',
    shortLabel: 'Plantain',
    description: 'Plantain mûr préparé selon la tradition, accompagné de votre protéine préférée.',
  },
  {
    id: 'spaghetti',
    label: 'Spaghetti',
    shortLabel: 'Spaghetti',
    description: 'Spaghetti sauté à la camerounaise, servi avec la protéine de votre choix.',
  },
  {
    id: 'riz-blanc',
    label: 'Riz blanc & sauce arachide',
    shortLabel: 'Riz blanc',
    description: 'Le plat réconfort par excellence : riz blanc et sauce d\'arachide.',
  },
  {
    id: 'fast-food',
    label: 'Fast-food',
    shortLabel: 'Fast-food',
    description: 'Pour une envie rapide et gourmande.',
  },
  {
    id: 'jus',
    label: 'Jus de fruits naturels',
    shortLabel: 'Jus naturels',
    description: 'Pressés et préparés maison, sans arômes artificiels.',
  },
  {
    id: 'kossam',
    label: 'Kossam — Yaourt naturel',
    shortLabel: 'Kossam',
    description: 'Yaourt traditionnel façon kossam, nature et rafraîchissant.',
  },
];

export const menuItems: MenuItem[] = [
  // ── Spéciaux du week-end ──────────────────────────────
 /* {
    id: 'wk-riz-water-poule',
    categoryId: 'weekend',
    name: 'Riz & Water Poule',
    price: 2500,
    badges: ['Spécial week-end'],
  }, */
  {
    id: 'wk-fufu-sauce-jaune',
    categoryId: 'weekend',
    name: 'Fufu Sauce Jaune',
    price: 2500,
    badges: ['Spécial week-end'],
  },
  {
    id: 'wk-ndole-crevettes',
    categoryId: 'weekend',
    name: 'Ndolé aux crevettes',
    description: 'Au choix : riz, plantain frites ou miondo.',
    price: 2000,
    choiceOf: ['Riz', 'Plantain frites', 'Miondo'],
    badges: ['Spécial week-end', 'Populaire'],
  },

  // ── Riz sénégalais ─────────────────────────────────────
  { id: 'rs-viande', categoryId: 'riz-senegalais', name: 'Riz sénégalais au bœuf', price: 1000 },
  { id: 'rs-biftek', categoryId: 'riz-senegalais', name: 'Riz sénégalais au biftek', price: 2000, badges: ['Populaire'] },
 // { id: 'rs-viande-hachee', categoryId: 'riz-senegalais', name: 'Riz sénégalais à la viande hachée', price: 2000 },
  { id: 'rs-foie', categoryId: 'riz-senegalais', name: 'Riz sénégalais au foie', price: 2000 },
  { id: 'rs-rognons', categoryId: 'riz-senegalais', name: 'Riz sénégalais aux rognons', price: 2500 },
  { id: 'rs-poulet', categoryId: 'riz-senegalais', name: 'Riz sénégalais au poulet rôti', price: 2500, badges: ['Populaire'] },
  { id: 'rs-poisson', categoryId: 'riz-senegalais', name: 'Riz sénégalais au poisson', price: 3000, badges: ['Populaire'] },
  { id: 'rs-oignon', categoryId: 'riz-senegalais', name: 'Riz sénégalais à l\u2019oignon', price: 3000 },

  // ── Pommes de terre sautées ────────────────────────────
  { id: 'pdt-biftek', categoryId: 'pommes-de-terre', name: 'Pommes de terre sautées au biftek', price: 2000 },
  { id: 'pdt-viande-hachee', categoryId: 'pommes-de-terre', name: 'Pommes de terre sautées à la viande hachée', price: 2000 },
  { id: 'pdt-rognons', categoryId: 'pommes-de-terre', name: 'Pommes de terre sautées aux rognons', price: 2000 },
  { id: 'pdt-foie', categoryId: 'pommes-de-terre', name: 'Pommes de terre sautées au foie', price: 2000 },
  { id: 'pdt-poulet', categoryId: 'pommes-de-terre', name: 'Pommes de terre sautées au poulet rôti', price: 2500, badges: ['Populaire'] },
  { id: 'pdt-poisson', categoryId: 'pommes-de-terre', name: 'Pommes de terre sautées au poisson', price: 2500 },
  { id: 'pdt-oignon', categoryId: 'pommes-de-terre', name: 'Pommes de terre sautées à l\u2019oignon', price: 2500 },
 /* {
    id: 'pdt-spaghetti-viande',
    categoryId: 'pommes-de-terre',
    name: 'Pommes de terre, spaghetti & viande',
    price: 2500,
  },*/
  {
    id: 'pdt-macaroni-viande',
    categoryId: 'pommes-de-terre',
    name: 'Pommes de terre, macaroni & viande',
    price: 2500,
  },
  {
    id: 'pdt-plantain-viande',
    categoryId: 'pommes-de-terre',
    name: 'Pommes de terre, plantain & viande',
    price: 2500,
  },

  // ── Plantain ────────────────────────────────────────────
  { id: 'pl-biftek', categoryId: 'plantain', name: 'Plantain au biftek', price: 2000 },
  { id: 'pl-viande-hachee', categoryId: 'plantain', name: 'Plantain à la viande hachée', price: 2000 },
  { id: 'pl-foie', categoryId: 'plantain', name: 'Plantain au foie', price: 2000 },
  //{ id: 'pl-rognons', categoryId: 'plantain', name: 'Plantain aux rognons', price: 2500 },
  { id: 'pl-poulet', categoryId: 'plantain', name: 'Plantain au poulet rôti', price: 2500, badges: ['Populaire'] },
  { id: 'pl-poisson', categoryId: 'plantain', name: 'Plantain au poisson', price: 3000 },
  { id: 'pl-oignon', categoryId: 'plantain', name: 'Plantain à l\u2019oignon', price: 3000 },

  // ── Spaghetti ───────────────────────────────────────────
  { id: 'sp-viande', categoryId: 'spaghetti', name: 'Spaghetti au bœuf', price: 1000 },
  { id: 'sp-viande-hachee', categoryId: 'spaghetti', name: 'Spaghetti à la viande hachée', price: 2000 },
  { id: 'sp-foie', categoryId: 'spaghetti', name: 'Spaghetti au foie', price: 2000 },
  //{ id: 'sp-rognons', categoryId: 'spaghetti', name: 'Spaghetti aux rognons', price: 2500 },
  //{ id: 'sp-poulet', categoryId: 'spaghetti', name: 'Spaghetti au poulet rôti', price: 2500 },
  { id: 'sp-poisson', categoryId: 'spaghetti', name: 'Spaghetti au poisson', price: 3000 },
  //{ id: 'sp-oignon', categoryId: 'spaghetti', name: 'Spaghetti à l\u2019oignon', price: 3000 },

  // ── Riz blanc ───────────────────────────────────────────
  {
    id: 'rb-arachide',
    categoryId: 'riz-blanc',
    name: 'Riz blanc & sauce d\u2019arachide',
    price: 1000,
  },

  // ── Fast-food ───────────────────────────────────────────
  { id: 'ff-shawarma', categoryId: 'fast-food', name: 'Shawarma', price: 1000, badges: ['Populaire'] },

  // ── Jus de fruits naturels ──────────────────────────────
  {
    id: 'jus-cocktail',
    categoryId: 'jus',
    name: 'Cocktail de fruits',
    priceOptions: [
      { label: 'Petit format', price: 500 },
      { label: 'Grand format', price: 1000 },
    ],
  },
  { id: 'jus-folere', categoryId: 'jus', name: 'Jus de foléré', price: 1000 },
  { id: 'jus-gingembre', categoryId: 'jus', name: 'Jus de gingembre', price: 2000 },
  {
    id: 'jus-baobab',
    categoryId: 'jus',
    name: 'Jus de baobab',
    priceOptions: [
      { label: 'Petit format', price: 1500 },
      { label: 'Grand format', price: 2500 },
    ],
  },
  { id: 'jus-citron', categoryId: 'jus', name: 'Jus de citron', price: 2000 },

  // ── Kossam ──────────────────────────────────────────────
  { id: 'kossam-05', categoryId: 'kossam', name: 'Kossam 0,5 L', price: 1000 },
  { id: 'kossam-1', categoryId: 'kossam', name: 'Kossam 1 L', price: 2000 },
  { id: 'kossam-15', categoryId: 'kossam', name: 'Kossam 1,5 L', price: 3000 },
];

/** Plats mis en avant sur la page d'accueil (CdC §7 et §13) */
export const featuredDishIds = [
  'rs-poisson',
  'rs-biftek',
  'rs-rognons',
  'pdt-poulet',
  'pdt-macaroni-viande',
  'wk-riz-water-poule',
];

export const featuredDishes = featuredDishIds
  .map((id) => menuItems.find((item) => item.id === id))
  .filter((item): item is MenuItem => Boolean(item));

export function getItemsByCategory(categoryId: MenuCategoryId) {
  return menuItems.filter((item) => item.categoryId === categoryId);
}

export function formatPriceFCFA(value: number) {
  return `${value.toLocaleString('fr-FR')} FCFA`;
}
