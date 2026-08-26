# Fiche technique — Les Délices d'Afrique (site web)

> **Objectif de ce document** : permettre à n'importe quel développeur — humain
> ou agent IA (Claude Code, Cursor, etc.) — de reprendre ce projet sans aucun
> contexte préalable : comprendre l'architecture, retrouver n'importe quelle
> information en quelques secondes, et pouvoir modifier ou étendre le code en
> toute sécurité.
>
> Dernière mise à jour : 19 août 2026 · Version du projet : 1.0.0

---

## 1. Résumé en une minute

| | |
|---|---|
| **Client** | Restaurant Les Délices d'Afrique — Bonadibong, Douala, Cameroun |
| **Type de projet** | Site vitrine + commande via WhatsApp (pas de paiement en ligne) |
| **Stack** | React Native + React Native Web, via **Expo Router** (routing par fichiers) |
| **Sortie web** | Export **statique** (1 fichier `.html` par page, pré-rendu pour le SEO) |
| **Langage** | TypeScript strict |
| **Statut** | Fonctionnel, type-check OK, build web statique OK. Contenu réel (photos, coordonnées) en attente côté client — voir §11 |
| **Développé par** | KN WEB & TECHNOLOGY |
| **Livrable initial** | `les-delices-dafrique-react-native-web.zip` (sans `node_modules`) |

**Pourquoi React Native Web plutôt que React classique ?** Le cahier des
charges du client demandait un site web (React + Tailwind suggéré), mais
anticipait un besoin futur d'application mobile. Le choix a été fait de
partir directement sur **Expo Router (React Native + React Native Web)** :
un seul code source produit à la fois le site web statique actuel et, plus
tard, une vraie app mobile iOS/Android, sans réécriture — seuls les
composants très spécifiques au web (ex. carte Google Maps en `<iframe>`)
sont isolés derrière des vérifications `Platform.OS === 'web'`.

---

## 2. Démarrage rapide

```bash
# Prérequis : Node.js 20+ (testé avec Node v22.22.2 / npm 10.9.7)

# 1. Installer les dépendances (le zip livré ne contient PAS node_modules)
cd les-delices-dafrique
npm install

# 2. Lancer en développement web
npx expo start --web
# → ouvre http://localhost:8081

# 3. Lancer en développement natif (nécessite l'app Expo Go sur le téléphone)
npx expo start
# → scanner le QR code affiché

# 4. Vérifier les types
npx tsc --noEmit

# 5. Build de production web (génère un site statique dans dist/)
npx expo export --platform web

# 6. Tester le build de production en local
npx serve dist
```

Aucune variable d'environnement n'est nécessaire : le projet ne parle à
aucun backend —  formulaires de service et formulaire de contact
composent tous un lien WhatsApp côté client (voir §8, §9 et
`components/contact/ContactForm.tsx`).

---

## 3. Arborescence complète du projet

```
les-delices-dafrique/
├── app/                          # Routing par fichiers (Expo Router) — 1 fichier = 1 route
│   ├── _layout.tsx                # Layout racine : polices, providers (Cart inclus), Stack
│   ├── +html.tsx                   # Document HTML racine (utilisé UNIQUEMENT à l'export statique web)
│   ├── +not-found.tsx               # Page 404
│   ├── index.tsx                     # Route "/"                → Accueil
│   ├── le-restaurant.tsx              # Route "/le-restaurant"    → À propos
│   ├── menu.tsx                        # Route "/menu"             → Menu complet filtrable
│   ├── services.tsx                     # Route "/services"         → Liste des 5 services
│   ├── services/[id].tsx                 # Route "/services/:id"     → Formulaire de demande par service
│   ├── galerie.tsx                       # Route "/galerie"          → Galerie photos
│   ├── contact.tsx                        # Route "/contact"          → Contact
│   ├── mentions-legales.tsx                # Route "/mentions-legales"
│   └── politique-confidentialite.tsx        # Route "/politique-confidentialite"
│
├── context/
│   └── CartContext.tsx             # ⭐ État global du panier (Provider + hook useCart())
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # Nav desktop + menu mobile plein écran (Modal) + CartButton
│   │   ├── Footer.tsx              # Horaires, contact, liens légaux
│   │   ├── PageShell.tsx           # Wrapper commun : Header + ScrollView + Footer + StickyMobileBar
│   │   └── StickyMobileBar.tsx     # Barre fixe bas d'écran mobile : Appeler / WhatsApp / Itinéraire
│   │
│   ├── cart/                       # ⭐ Panier multi-plats
│   │   ├── CartButton.tsx           # Icône panier + badge (nombre d'articles), dans le Header
│   │   ├── CartModal.tsx            # Panier + formulaire de commande (mode réception, adresse, nom, tél.)
│   │   └── CartLineItem.tsx         # Une ligne du panier : quantité, note, suppression
│   │
│   ├── ui/                         # Primitives réutilisables, sans logique métier
│   │   ├── Button.tsx               # 5 variantes : primary, secondary, dark, whatsapp, ghost
│   │   ├── Badge.tsx                # Pastille "Spécial week-end" / "Populaire"
│   │   ├── Container.tsx            # Largeur max centrée (maxContentWidth = 1180px)
│   │   ├── Section.tsx              # Wrapper de section avec fond (cream/white/dark/ivory) + padding
│   │   ├── SectionHeading.tsx       # Bloc eyebrow + titre + sous-titre standardisé
│   │   ├── PatternDivider.tsx       # ⭐ Élément signature : chevron doré tissé (SVG)
│   │   └── PlaceholderImage.tsx     # ⭐ Vraie photo (via `uri`) avec repli auto si le fichier n'existe pas
│   │
│   ├── home/                       # Sections spécifiques à la page d'accueil uniquement
│   │   ├── Hero.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── FeaturedDishes.tsx
│   │   ├── AboutPreview.tsx
│   │   ├── ServicesPreview.tsx
│   │   ├── GalleryPreview.tsx
│   │   ├── HoursLocation.tsx
│   │   └── ContactCTA.tsx
│   │
│   ├── menu/
│   │   ├── CategoryTabs.tsx         # Onglets horizontaux sticky (filtre par catégorie)
│   │   ├── MenuItemCard.tsx         # Carte plat — bouton "Ajouter au panier" bien visible (⭐ voir §7.6)
│   │   └── MenuSection.tsx          # Regroupe les MenuItemCard par catégorie
│   │
│   ├── services/
│   │   ├── ServiceCard.tsx          # Carte service → navigue vers /services/:id (formulaire)
│   │   └── ServiceRequestForm.tsx   # ⭐ Formulaire de demande, champs adaptés par service → WhatsApp
│   │
│   ├── gallery/
│   │   └── GalleryGrid.tsx          # Grille responsive avec filtre par tag
│   │
│   ├── contact/
│   │   ├── ContactActions.tsx       # 4 grandes cartes tactiles : Appeler/WhatsApp/Itinéraire/Email
│   │   ├── ContactForm.tsx          # Formulaire → compose un lien WhatsApp pré-rempli (pas de backend)
│   │   └── MapEmbed.tsx             # `<iframe>` Google Maps (web) / placeholder (natif)
│   │
│   └── seo/
│       ├── PageHead.tsx             # Injecte title/meta/canonical/OG/Twitter par page
│       └── StructuredData.tsx       # Injecte le JSON-LD Schema.org "Restaurant" (site entier)
│
├── data/                          # ⭐ TOUT le contenu texte/prix du site est ici — jamais en dur dans les composants
│   ├── restaurant.ts               # Nom, adresse, téléphone, horaires, "pourquoi nous choisir", historique
│   ├── menu.ts                     # Catégories + tous les plats/prix
│   ├── services.ts                 # Sur place, Livraison, Mariages, Anniversaires, Baptêmes
│   ├── gallery.ts                  # Items de galerie (tags + labels)
│   └── seo.ts                      # title/description/keywords par route + siteUrl
│
├── constants/
│   └── theme.ts                    # Design tokens : colors, spacing, radii, shadow, fonts, type, breakpoints
│
├── utils/
│   ├── contact.ts                   # Constructeurs de liens tel:/wa.me/Google Maps + messages pré-remplis
│   ├── cartMessage.ts               # ⭐ Construit le message WhatsApp final d'une commande panier
│   ├── images.ts                    # ⭐ Construit les URL des photos réelles (public/images/..., format .webp)
│   ├── useResponsive.ts             # Hook basé sur useWindowDimensions (isMobile/isTablet/isDesktop/isWide)
│   ├── useAppFonts.ts               # Chargement des polices Google (Fraunces + Manrope) via expo-font
│   └── ForceFocusedProvider.tsx     # ⚠️ Contournement d'un bug expo-router — voir §10.1, NE PAS SUPPRIMER
│
├── public/                        # Copié tel quel à la racine du site exporté
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/                     # ⭐ Vos vraies photos (.webp) — voir images/README.md pour les noms exacts
│       ├── README.md
│       ├── menu/
│       ├── gallery/
│       ├── services/
│       └── restaurant/
│
├── assets/images/                 # Icônes app (générées par défaut par create-expo-app — à personnaliser)
│
├── app.json                       # Config Expo (nom, bundle ID, export web statique, plugins)
├── babel.config.js                # preset "babel-preset-expo" (inclut le support expo-router)
├── metro.config.js                # Config Metro par défaut (getDefaultConfig d'Expo)
├── tsconfig.json                  # strict: true, alias "@/*" → racine du projet
├── package.json
└── README.md                      # Guide de démarrage côté client (moins technique que ce document)
```

**Règle d'or du projet** : toute donnée affichée (nom d'un plat, prix,
horaire, texte de section) vit dans `data/*.ts`. Les composants ne
contiennent **aucun texte ni prix en dur** — c'est ce qui permet de mettre à
jour le menu ou les coordonnées sans toucher au moindre composant.

---

## 4. Stack technique — versions exactes

Extrait de `package.json` (versions figées au moment de la livraison) :

```json
{
  "dependencies": {
    "expo": "~57.0.14",
    "expo-router": "^57.0.14",
    "react": "19.2.3",
    "react-dom": "^19.2.3",
    "react-native": "0.86.2",
    "react-native-web": "^0.21.2",
    "react-native-svg": "^15.15.5",
    "react-native-safe-area-context": "^5.9.1",
    "react-native-screens": "^4.27.0",
    "@expo/vector-icons": "^15.1.1",
    "@expo-google-fonts/fraunces": "^0.4.1",
    "@expo-google-fonts/manrope": "^0.4.2",
    "expo-font": "^57.0.1",
    "expo-splash-screen": "^57.0.7",
    "expo-status-bar": "~57.0.1",
    "expo-system-ui": "^57.0.2",
    "expo-constants": "^57.0.12",
    "expo-linking": "^57.0.6",
    "expo-blur": "^57.0.2"
  },
  "devDependencies": {
    "@types/react": "~19.2.2",
    "babel-preset-expo": "^57.0.7",
    "typescript": "~6.0.3"
  }
}
```

- **Environnement testé** : Node.js v22.22.2, npm 10.9.7
- **Aucun state manager externe** (pas de Redux/Zustand) : l'état est local
  aux composants (`useState`) — le site n'a pas besoin de plus, il n'y a pas
   de session utilisateur
- **Aucun backend / API** : toutes les "actions" (commander, réserver,
  contacter) ouvrent un lien `tel:`, `wa.me` ou `mailto:` côté client
- **Icônes** : `@expo/vector-icons`, famille `Feather` utilisée partout
  (`import { Feather } from '@expo/vector-icons'`)

---

## 5. Système de routing (Expo Router)

Expo Router fait du **routing par fichiers** : chaque fichier dans `app/`
devient une URL. Pas de fichier de config de routes à maintenir à part.

| Fichier | URL | Rôle |
|---|---|---|
| `app/index.tsx` | `/` | Accueil |
| `app/le-restaurant.tsx` | `/le-restaurant` | À propos |
| `app/menu.tsx` | `/menu` | Menu complet |
| `app/services.tsx` | `/services` | Services |
| `app/galerie.tsx` | `/galerie` | Galerie |
| `app/contact.tsx` | `/contact` | Contact |
| `app/mentions-legales.tsx` | `/mentions-legales` | Légal |
| `app/politique-confidentialite.tsx` | `/politique-confidentialite` | Légal |
| `app/+not-found.tsx` | (toute route inconnue) | 404 |
| `app/_layout.tsx` | — | Layout racine, ne génère pas de route |
| `app/+html.tsx` | — | Document HTML racine (web statique uniquement) |

**Pour ajouter une nouvelle page** : créer `app/nouvelle-page.tsx` qui
exporte un composant par défaut. Elle devient automatiquement accessible sur
`/nouvelle-page`. Voir §12.1 pour le modèle exact à suivre.

**Navigation dans le code** : `import { router } from 'expo-router'` puis
`router.push('/menu')`, ou `<Link href="/menu">...</Link>` pour un lien
déclaratif.

---

## 6. Système de design (`constants/theme.ts`)

### 6.1 Palette de couleurs

| Token | Valeur | Usage |
|---|---|---|
| `colors.gold` | `#C9A227` | Couleur de marque — CTA primaires, accents |
| `colors.goldLight` | `#E8C468` | Survol, badges clairs |
| `colors.goldDeep` | `#9C7A16` | État pressé du bouton primaire |
| `colors.charcoal` | `#181410` | Fond sombre (header nav mobile fermé, footer, sections sombres) |
| `colors.charcoalSoft` | `#241E17` | Cartes sur fond sombre |
| `colors.cream` | `#FBF6EC` | Fond principal du site |
| `colors.ivory` | `#F3EAD6` | Fond de section alterné |
| `colors.terracotta` | `#A6461F` | Accent secondaire (badge "Spécial week-end", alertes placeholder) |
| `colors.success` | `#3C8A54` | Couleur WhatsApp (boutons, badges de commande) |

### 6.2 Typographies

- **Titres (`fonts.display`)** : `Fraunces_600SemiBold` (+ variantes `_700Bold`, `_500Medium_Italic`) — serif chaleureuse et gastronomique
- **Texte courant (`fonts.body`)** : `Manrope_400Regular` (+ `_500Medium`, `_600SemiBold`, `_700Bold`) — sans-serif géométrique, très lisible sur mobile

Chargées via `utils/useAppFonts.ts` (hook `useFonts` de `expo-font`), appelé
une seule fois dans `app/_layout.tsx`.

### 6.3 Autres tokens

- `spacing` : échelle `xxs`(4) → `xxxl`(104), en px
- `radii` : `sm`(8) `md`(14) `lg`(22) `pill`(999)
- `shadow.card` / `shadow.raised` : objets de style d'ombre prêts à l'emploi
- `breakpoints` : `tablet`(768) `desktop`(1080) `wide`(1280) — consommés via `utils/useResponsive.ts`
- `maxContentWidth` : 1180px (largeur max du contenu, voir `Container`)

### 6.4 Élément signature

`components/ui/PatternDivider.tsx` : un chevron doré tissé en SVG
(`react-native-svg`), clin d'œil discret aux textiles africains sans
reprendre un motif culturel précis. Utilisé avec parcimonie entre les
sections clés (Hero, séparateurs de bannières).

---

## 7. Modèle de données (`data/`)

C'est le cœur du contenu du site. **Toute modification de texte, prix ou
coordonnée passe par ces fichiers.**

### 7.1 `data/menu.ts` — le menu

```ts
export type MenuCategoryId =
  | 'weekend' | 'riz-senegalais' | 'spaghetti' | 'pommes-de-terre'
  | 'plantain' | 'riz-blanc' | 'fast-food' | 'jus' | 'kossam';

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;        // Nom complet affiché en titre de section
  shortLabel: string;    // Nom court affiché dans les onglets
  description: string;
}

export interface MenuItem {
  id: string;                      // slug unique, ex. "rs-poisson"
  categoryId: MenuCategoryId;
  name: string;
  description?: string;
  price?: number;                  // en FCFA, si un seul prix
  priceOptions?: { label: string; price: number }[];  // si plusieurs formats (ex. jus)
  choiceOf?: string[];             // ex. Ndolé : ["Riz", "Plantain frites", "Miondo"]
  badges?: Array<'Spécial week-end' | 'Populaire'>;
}
```

- `categories: MenuCategory[]` — les 9 catégories, dans l'ordre d'affichage
- `menuItems: MenuItem[]` — tous les plats (~46 entrées)
- `featuredDishIds: string[]` — les IDs mis en avant sur l'accueil
  (section "Nos plats phares") — modifier cette liste pour changer la
  sélection
- `getItemsByCategory(id)` / `formatPriceFCFA(value)` — helpers

**Pour ajouter un plat** : ajouter un objet dans `menuItems`, avec un `id`
unique. Il apparaît automatiquement dans `/menu` (page + onglet de sa
catégorie) et dans le JSON-LD SEO s'il appartient à la catégorie `weekend`
(voir `StructuredData.tsx`).

**Pour ajouter une catégorie** : l'ajouter au type `MenuCategoryId`, puis à
`categories[]`.

### 7.2 `data/restaurant.ts` — identité du restaurant

Contient : `name`, `tagline`, `intro`, `addressLine`, `geo` (lat/lng),
`phoneDisplay`, `whatsappNumber`, `email`, `hours`, `social`,
`whyChooseUs[]`, `about.paragraphs[]`, `about.values[]`.

⚠️ **Plusieurs champs sont des valeurs provisoires marquées `// À
CONFIRMER`** dans les commentaires du fichier — voir §11 pour la liste
complète. Ne jamais publier en production sans les avoir remplacées par les
vraies données validées par le client.

### 7.3 `data/services.ts` — services

5 services (`sur-place`, `livraison`, `mariages`, `anniversaires`,
`baptemes`), chacun avec `title`, `shortDescription`, `description`, `icon`,
`ctaLabel`.

### 7.4 `data/gallery.ts` — galerie

`galleryTags[]` (filtres) + `galleryItems[]` (id, tag, label). Les images
réelles ne sont pas encore intégrées (voir §11) — chaque item affiche
actuellement un `PlaceholderImage` avec son `label` comme légende.

### 7.5 `data/seo.ts` — métadonnées SEO par page

```ts
export interface RouteSeo {
  path: string;
  title: string;
  description: string;
  keywords: string[];
}
export const routesSeo: Record<string, RouteSeo> = { home: {...}, menu: {...}, ... };
export const siteUrl = 'https://www.lesdelicesdafrique.cm'; // ⚠️ à remplacer une fois le domaine choisi
```

Chaque route consomme son entrée via `<PageHead seo={routesSeo.xxx} />`
(voir §10).

### 7.6 Photos réelles (`utils/images.ts`)

Voir §11 pour les instructions destinées au client. Côté code : chaque
`PlaceholderImage` accepte une prop `uri`. Si l'URL pointe vers un fichier
qui existe dans `public/images/...`, la vraie photo s'affiche ; sinon
(fichier absent), le composant retombe silencieusement sur son bloc visuel
"photo à venir" grâce à `onError` — jamais d'image cassée à l'écran.

```
menuImageUri('rs-poisson')        → "/images/menu/rs-poisson.webp"
galleryImageUri('g1')             → "/images/gallery/g1.webp"
serviceImageUri('livraison')      → "/images/services/livraison.webp"
restaurantImageUri('hero')        → "/images/restaurant/hero.webp"
```

Format imposé : **`.webp`** (plus léger qu'un `.jpg` à qualité équivalente,
meilleur pour la vitesse de chargement mobile — un facteur de SEO local).

---

## 8. Panier multi-plats & commande

### 8.1 Fonctionnement général

Le site permet de composer une commande avec plusieurs plats avant de
l'envoyer en une seule fois, plutôt que d'envoyer un message WhatsApp par
plat commandé individuellement.

- `context/CartContext.tsx` : état global du panier (`CartProvider` +
  hook `useCart()`), monté une seule fois dans `app/_layout.tsx`. Contenu du
  panier gardé en mémoire (pas de persistance entre rechargements de page —
  choix volontaire pour rester simple ; voir §8.4 pour une piste d'évolution)
- `components/cart/CartButton.tsx` : icône panier + badge (nombre
  d'articles), affichée dans le `Header` sur toutes les pages
- `components/cart/CartModal.tsx` : le panier lui-même, en modale — liste
  des plats, quantités, notes, **et le formulaire de commande** (voir §8.3)
- `components/cart/CartLineItem.tsx` : une ligne de panier (nom, prix
  unitaire, stepper +/-, note libre, suppression)
- `utils/cartMessage.ts` : construit le texte final envoyé sur WhatsApp à
  partir du contenu du panier + des informations de commande

### 8.2 Ajouter un plat au panier

Le bouton "Ajouter au panier" (`components/menu/MenuItemCard.tsx`) est
volontairement **très visible** : bouton plein, pleine largeur de la carte,
couleur or de marque, icône panier — remplace l'ancien petit lien
"Commander" discret. Au clic, le bouton affiche brièvement "Ajouté ✓" en
retour visuel (1,2 seconde), sans ouvrir automatiquement le panier — pour
ne pas interrompre le client s'il veut ajouter plusieurs plats à la suite.

**Cas des plats à formats multiples** (ex. "Cocktail de fruits" — petit ou
grand format) : `MenuItem.priceOptions` fait apparaître un bouton par
format au lieu d'un bouton unique, chaque format étant ajouté comme une
ligne de panier distincte (id `"jus-cocktail::Petit format"`).

**Cas des plats à choix d'accompagnement** (ex. Ndolé — riz / plantain
frites / miondo, via `MenuItem.choiceOf`) : le champ note de la ligne
panier affiche ce choix en placeholder (`noteHint`), le client peut taper
sa préférence directement dans le panier.

### 8.3 Formulaire de commande (dans le panier)

En bas du panier, avant l'envoi :

- **Mode de réception** : Sur place / À emporter / Livraison (3 boutons)
- **Adresse de livraison** — apparaît **immédiatement**, juste en dessous,
  dès que "Livraison" est sélectionné (c'était une exigence explicite : le
  lieu de livraison doit être demandé directement dans le parcours de
  commande, pas relégué à une étape séparée)
- Nom, téléphone (obligatoires)
- Précisions libres (optionnel)

Au clic sur "Envoyer la commande sur WhatsApp" : le message est composé
(liste des plats, quantités, notes, total, mode de réception, adresse si
applicable, coordonnées client), WhatsApp s'ouvre avec le message pré-
rempli, puis le panier se vide et la modale se ferme.

Exemple de message généré :

```
Bonjour Les Délices d'Afrique 👋, je souhaite passer la commande suivante :

• 2x Riz sénégalais au poisson — 6 000 FCFA
• 1x Ndolé aux crevettes — 2 000 FCFA
   (précision : riz)

Total : 8 000 FCFA

Mode de réception : Livraison
Adresse de livraison : Akwa, non loin de la pharmacie X
Nom : Jean Dupont
Téléphone : 6XX XXX XXX

Merci de me confirmer la disponibilité et le délai.
```

### 8.4 Pour modifier le comportement du panier

- Changer le texte du message → `utils/cartMessage.ts`
- Ajouter un mode de réception → `ReceptionMode` dans
  `context/CartContext.tsx` + `RECEPTION_OPTIONS` dans `CartModal.tsx`
- Ajouter la persistance du panier après rechargement de page → remplacer
  `useState` par une lecture/écriture `AsyncStorage` dans
  `CartContext.tsx` (nécessite d'installer
  `@react-native-async-storage/async-storage`)

---

## 9. Formulaires de demande de service

### 9.1 Fonctionnement général

Chaque service (`data/services.ts`) a sa propre page de demande, générée
dynamiquement par la route `app/services/[id].tsx` :

- `/services/sur-place`
- `/services/livraison`
- `/services/mariages`
- `/services/anniversaires`
- `/services/baptemes`

Cliquer sur le bouton d'une `ServiceCard` (sur l'accueil ou sur
`/services`) navigue désormais vers cette page dédiée — **plus d'envoi
direct sur WhatsApp au clic** : le client remplit d'abord un court
formulaire, qui compose ensuite le message WhatsApp à sa place.

`generateStaticParams()` (dans `app/services/[id].tsx`) pré-génère une
vraie page HTML statique par service au moment du build
(`dist/services/mariages.html`, etc.) — chaque page a donc son propre
`<title>`/`<meta description>`, contrairement à un simple gabarit
générique qui nécessiterait une règle de réécriture d'URL côté hébergeur.

### 9.2 Champs du formulaire (`components/services/ServiceRequestForm.tsx`)

Les champs affichés s'adaptent au service concerné :

| Champ | Toujours affiché ? | Condition |
|---|---|---|
| Nom, téléphone | ✅ Toujours | Obligatoires |
| Date souhaitée, nombre de personnes | Seulement | `sur-place`, `mariages`, `anniversaires`, `baptemes` |
| Adresse de livraison | Seulement | `livraison` — **obligatoire** dans ce cas |
| Détails / message libre | ✅ Toujours | Optionnel |

Pour ajouter un champ propre à un service, éditer
`EVENT_SERVICE_IDS` (liste des services "événementiels") ou ajouter une
condition `service.id === '...'` dans `ServiceRequestForm.tsx`, en suivant
le même schéma que le champ "Adresse de livraison".

### 9.3 Envoi

Au clic sur "Envoyer la demande sur WhatsApp", le composant construit un
message texte reprenant tous les champs remplis et ouvre
`wa.me/<numéro>?text=<message encodé>` dans un nouvel onglet — même
mécanisme sans backend que le panier (§8) et le formulaire de contact
général (`components/contact/ContactForm.tsx`).

---

## 10. SEO — implémentation & piège technique important

### 10.1 ⚠️ Bug expo-router 57.x corrigé — à connaître avant de toucher au layout

**Symptôme observé pendant le développement** : lors de l'export statique
(`npx expo export --platform web`), le contenu visible des pages
s'affichait correctement dans le HTML généré, mais **toutes les balises
`<title>` et `<meta>` posées via `<Head>` (expo-router/head) étaient
vides**, cassant tout le SEO alors que rien ne semblait fautif dans le code
applicatif.

**Deux causes cumulées ont été identifiées et corrigées :**

1. **`useIsFocused()` renvoie toujours `false` pendant le rendu statique.**
   Le composant `<Head>` d'expo-router n'affiche son contenu que si l'écran
   est "focused" (`useIsFocused()`). Lors de l'export statique, chaque page
   est rendue côté Node.js en une seule passe synchrone : aucun événement de
   navigation ne se déclenche jamais, donc `useIsFocused()` reste à `false`
   pour toujours, et `<Head>` ne rend jamais rien.

   **Correctif** : `utils/ForceFocusedProvider.tsx` force le contexte
   interne `IsFocusedContext` (importé depuis le chemin interne
   `expo-router/build/react-navigation/core/useIsFocused`) à `true` pour
   tout l'arbre. Comme l'export statique ne traite qu'une seule route à la
   fois, il est toujours sémantiquement correct de la considérer comme
   focused. **Ce provider est appliqué dans `app/_layout.tsx` et ne doit
   pas être retiré.**

2. **Double `Head.Provider` en conflit.** Le moteur de rendu statique
   d'Expo injecte déjà son propre `Head.Provider` (react-helmet-async) en
   interne pour collecter les balises de chaque page. Le code avait, par
   erreur, ajouté un second `<Head.Provider>` explicite dans
   `app/_layout.tsx`, ce qui créait un contexte Helmet parallèle : les
   balises posées par les pages s'enregistraient dans le mauvais
   contexte et n'étaient jamais lues par le processus d'export.

   **Correctif** : ne **jamais** ajouter `<Head.Provider>` manuellement
   dans `_layout.tsx` — expo-router s'en occupe tout seul à l'export. C'est
   corrigé dans la version livrée.

**Comment vérifier que le SEO fonctionne toujours après une modification :**

```bash
npx expo export --platform web
grep -o '<title[^>]*>[^<]*</title>' dist/index.html
grep -o '<meta name="description"[^>]*>' dist/index.html
grep -c 'application/ld+json' dist/index.html   # doit renvoyer 1
```

Si `<title>` ressort vide (`<title data-rh="true"></title>`), c'est que
l'un de ces deux pièges a été réintroduit.

### 10.2 `components/seo/PageHead.tsx`

Composant appelé en tête de chaque page (`<PageHead seo={routesSeo.xxx} />`).
Injecte via `expo-router/head` : `<title>`, meta `description`/`keywords`,
`<link rel="canonical">`, balises Open Graph et Twitter Card, et
`geo.region`/`geo.placename` (Douala) pour le SEO local.

### 10.3 `components/seo/StructuredData.tsx`

Injecte un unique bloc JSON-LD `@type: "Restaurant"` (Schema.org),
monté une seule fois dans `app/_layout.tsx` (donc présent sur toutes les
pages). Contient : nom, adresse, géolocalisation, téléphone, horaires
d'ouverture, type de cuisine, gamme de prix, et le détail des plats de la
catégorie "week-end".

### 10.4 `app/+html.tsx`

Document HTML racine utilisé uniquement lors de l'export statique web :
`lang="fr"`, viewport, `theme-color`, préconnexion aux polices Google
(amélioration LCP), reset CSS de fond.

### 10.5 `public/robots.txt` et `public/sitemap.xml`

Copiés tels quels à la racine du site exporté (`dist/robots.txt`,
`dist/sitemap.xml`). **Le domaine `lesdelicesdafrique.cm` qu'ils
contiennent est un placeholder** — à mettre à jour partout
(`data/seo.ts` → `siteUrl`, ces deux fichiers) une fois le nom de domaine
définitif choisi et déployé.

### 10.6 Export statique — pourquoi c'est important

`app.json → expo.web.output = "static"` fait qu'`expo export --platform web`
génère **un fichier `.html` distinct et pré-rendu pour chaque route**
(`dist/index.html`, `dist/menu.html`, etc.), contenant déjà tout le HTML
visible et les balises SEO — contrairement à une SPA classique où Google
devrait exécuter le JavaScript pour voir le contenu. C'est ce qui rend le
référencement local fiable.

---

## 11. Informations manquantes à obtenir du client avant mise en ligne

Recherchez la chaîne `À CONFIRMER` dans le code pour retrouver tous les
emplacements exacts. Résumé :

| Donnée | Fichier | Valeur actuelle (placeholder) |
|---|---|---|
| Adresse précise | `data/restaurant.ts` → `addressDetail` | "Adresse précise à confirmer..." |
| Coordonnées GPS exactes | `data/restaurant.ts` → `geo.latitude/longitude` | Coordonnées approximatives d'Akwa, Douala |
| Téléphone | `data/restaurant.ts` → `phoneDisplay` | `+237 6XX XXX XXX` |
| WhatsApp | `data/restaurant.ts` → `whatsappNumber` | `+237 6XX XXX XXX` |
| Email | `data/restaurant.ts` → `email` | `contact@lesdelicesdafrique.cm` (probablement à créer) |
| Réseaux sociaux | `data/restaurant.ts` → `social.*` | Vides |
| Fiche Google Business | `data/restaurant.ts` → `social.googleBusiness` | Vide — à créer (le CdC signale qu'elle n'existe pas encore) |
| Nom de domaine définitif | `data/seo.ts` → `siteUrl` + `public/robots.txt` + `public/sitemap.xml` | `https://www.lesdelicesdafrique.cm` |
| Raison sociale, RCCM, NIU | `app/mentions-legales.tsx` | Non renseigné, affiché comme avertissement visible sur la page |
| Hébergeur du site | `app/mentions-legales.tsx` | Non renseigné |
| Photos réelles | Partout où `<PlaceholderImage>` est utilisé (plats, salle, équipe, événements) | Blocs visuels avec icône + légende, volontairement non génériques |

**Pourquoi des placeholders et pas de fausses photos/infos ?** Choix
délibéré : afficher de fausses photos de plats ou une adresse inventée
créerait une attente trompeuse chez le client final. `PlaceholderImage`
identifie clairement, dans l'interface elle-même, ce qui doit encore être
fourni.

---

## 12. Guides pratiques pour reprendre le projet

### 12.1 Ajouter une nouvelle page

1. Créer `app/ma-page.tsx` :
   ```tsx
   import React from 'react';
   import { PageShell } from '@/components/layout/PageShell';
   import { PageHead } from '@/components/seo/PageHead';
   import { routesSeo } from '@/data/seo';

   export default function MaPageScreen() {
     return (
       <PageShell>
         <PageHead seo={routesSeo.maPage} /> {/* voir étape 2 */}
         {/* contenu de la page */}
       </PageShell>
     );
   }
   ```
2. Ajouter une entrée `maPage: {...}` dans `routesSeo` (`data/seo.ts`)
3. Ajouter le lien dans `NAV_LINKS` (`components/layout/Header.tsx`) et dans
   le footer (`components/layout/Footer.tsx`) si la page doit apparaître
   dans la navigation
4. Ajouter l'URL dans `public/sitemap.xml`

### 12.2 Modifier une couleur du design

Tout se passe dans `constants/theme.ts` (`colors`). Une modification là se
répercute automatiquement partout — aucun composant n'utilise de couleur en
dur (`#hexcode`) en dehors de ce fichier et de quelques styles inline
d'overlay/ombre.

### 12.3 Ajouter/modifier un plat

Éditer `data/menu.ts` → tableau `menuItems`. Aucune autre modification
nécessaire (voir §7.1).

### 12.4 Composant qui a besoin d'un rendu différent web/natif

Utiliser `Platform.OS === 'web'` (import de `react-native`). Exemple réel
dans le projet : `components/contact/MapEmbed.tsx` et
`components/home/HoursLocation.tsx` utilisent une vraie balise `<iframe>`
HTML (via `// @ts-ignore` car ce n'est pas un élément React Native standard)
uniquement quand `Platform.OS === 'web'`, et affichent un `PlaceholderImage`
sinon (l'app mobile native devra un jour utiliser `react-native-maps` ou
ouvrir l'app Google Maps).

### 12.5 Déploiement

Le dossier `dist/` généré par `npx expo export --platform web` est un site
statique standard, déployable tel quel sur :
- Netlify / Vercel (drag & drop du dossier `dist`, ou build command
  `npx expo export --platform web` + publish directory `dist`)
- EAS Hosting (`eas deploy`, nécessite un compte Expo)
- Tout hébergement statique classique (OVH, Cloudflare Pages, GitHub Pages...)

Penser à mettre à jour `data/seo.ts → siteUrl`, `public/robots.txt` et
`public/sitemap.xml` avec le domaine réel **avant** le premier déploiement.

---

## 13. Ce qui n'est PAS encore implémenté (limites connues)

- **Pas de  paiement en ligne** — toute commande passe par un lien
  WhatsApp pré-rempli (choix assumé pour la V1, cohérent avec un
  restaurant local sans logistique de paiement en ligne)
- **Pas de CMS** — le contenu se modifie en éditant les fichiers
  `data/*.ts` directement (nécessite de committer/redéployer)
- **Pas de vraies photos** — voir §11
- **Build natif (iOS/Android) non testé** — le projet est structuré pour
  fonctionner en React Native pur (aucun composant web-only n'est utilisé
  sans garde `Platform.OS`), mais seul le build **web** a été construit et
  vérifié de bout en bout pour cette livraison
- **Pas de tests automatisés** (unitaires/e2e) — à ajouter si le projet
  grandit
- **`app.json → githubUrl`** pointe vers une URL d'exemple
  (`github.com/kn-web-technology/les-delices-dafrique`) — à corriger si un
  vrai dépôt est créé, ou à retirer

---

## 14. Vérifications effectuées avant livraison

- ✅ `npx tsc --noEmit` : aucune erreur (TypeScript strict)
- ✅ `npx expo export --platform web` : build statique réussi, 10 routes
  générées
- ✅ Vérification manuelle du HTML généré : `<title>`, `<meta
  description>`, `<link canonical>`, Open Graph, Twitter Card et JSON-LD
  Restaurant tous présents et corrects sur chaque page
- ✅ `robots.txt` et `sitemap.xml` bien copiés dans `dist/`
- ⚠️ Pas de vérification visuelle par capture d'écran (environnement de
  développement sans navigateur graphique) — une revue visuelle manuelle
  dans un vrai navigateur est recommandée avant mise en production

---

## 15. Contact / paternité du code

Site conçu et développé par **KN WEB & TECHNOLOGY**, à partir du cahier des
charges fourni par le client et du menu complet transmis en conversation.
Ce document technique fait foi pour toute reprise ultérieure du projet.
