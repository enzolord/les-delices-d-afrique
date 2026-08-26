# Les Délices d'Afrique — Site web (React Native Web / Expo Router)

Site web du restaurant **Les Délices d'Afrique** (Akwa, Douala), construit en
React Native + React Native Web via **Expo Router**, avec export **statique**
pour un bon référencement local (Douala, Akwa, livraison, traiteur).

> Cette base React Native Web permet, plus tard, de réutiliser une grande
> partie du code (données, logique, une partie des composants) pour une
> application mobile native, sans tout reconstruire.

---

## 🚀 Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le site en développement (web)
npx expo start --web
```

Le site s'ouvre alors sur `http://localhost:8081`.

Pour prévisualiser l'app en natif (Expo Go) : lancez `npx expo start` (sans
`--web`) et scannez le QR code avec l'app Expo Go sur votre téléphone.

## 📦 Build de production (web)

```bash
npx expo export --platform web
```

Cela génère un dossier `dist/` contenant un site **100 % statique** (un
fichier `.html` par page, pré-rendu pour le SEO), déployable sur n'importe
quel hébergement statique : Netlify, Vercel, Cloudflare Pages, EAS Hosting,
GitHub Pages, etc.

```bash
# Tester le build de production en local avant de déployer
npx serve dist
```

---

## 🗂️ Structure du projet

```
app/                     → Pages du site (routing par fichiers, Expo Router)
  _layout.tsx             → Layout racine (polices, providers)
  +html.tsx                → Document HTML racine (SEO technique, export statique)
  index.tsx                 → Accueil
  le-restaurant.tsx          → Page "Le restaurant"
  menu.tsx                    → Menu complet (filtrable par catégorie)
  services.tsx                 → Sur place / Livraison / Traiteur (mariages, anniv., baptêmes)
  galerie.tsx                   → Galerie photos
  contact.tsx                    → Contact (appel, WhatsApp, carte, formulaire)
  mentions-legales.tsx
  politique-confidentialite.tsx

components/
  layout/     → Header, Footer, PageShell, StickyMobileBar (barre d'actions mobile)
  ui/         → Button, Badge, Section, SectionHeading, PlaceholderImage, PatternDivider...
  home/       → Sections spécifiques à la page d'accueil
  menu/       → CategoryTabs, MenuItemCard, MenuSection
  services/   → ServiceCard
  gallery/    → GalleryGrid
  contact/    → ContactActions, ContactForm, MapEmbed
  seo/        → PageHead (title/meta par page), StructuredData (JSON-LD Restaurant)

data/         → Contenu du site (menu, restaurant, services, galerie, SEO)
constants/    → Design tokens (couleurs, typographies, espacements)
utils/        → Fonctions utilitaires (liens tel:/WhatsApp/Maps, responsive...)
public/       → Fichiers statiques copiés tels quels (robots.txt, sitemap.xml)
```

---

## ⚠️ Informations à confirmer avant mise en ligne

Conformément au cahier des charges, **aucune information officielle n'a été
inventée**. Les champs suivants contiennent des valeurs provisoires à
remplacer une fois validées par le restaurant — cherchez `À CONFIRMER` dans
le code pour les retrouver toutes :

| Fichier | Informations à compléter |
|---|---|
| `data/restaurant.ts` | Adresse exacte, téléphone, WhatsApp, e-mail, coordonnées GPS précises, liens réseaux sociaux |
| `app/mentions-legales.tsx` | Raison sociale, RCCM, NIU, hébergeur du site |
| `data/seo.ts` | Nom de domaine définitif (`siteUrl`), à remplacer une fois choisi |
| Toutes les `PlaceholderImage` | Vraies photos du restaurant, des plats, de l'équipe (actuellement des blocs visuels temporaires, volontairement non génériques pour ne pas afficher de fausses photos) |

Une fois ces informations reçues, il suffit de les reporter dans ces
fichiers — aucune autre modification de code n'est nécessaire.

## 🍽️ Modifier le menu

Tout le menu est centralisé dans `data/menu.ts` (catégories + plats). Pour
ajouter, retirer ou modifier un plat ou un prix, il suffit d'éditer ce
fichier : le site (accueil, page menu, JSON-LD SEO) se met à jour partout
automatiquement.

## 🎨 Design

- Palette : or `#C9A227` / noir chaud `#181410` / crème `#FBF6EC` (voir
  `constants/theme.ts` pour l'ensemble des tokens)
- Typographies : **Fraunces** (titres) + **Manrope** (texte courant)
- Élément signature : un chevron doré tissé (`components/ui/PatternDivider.tsx`),
  clin d'œil discret aux textiles africains

## 📈 SEO local

- Chaque page a son propre `<title>` / `<meta description>` / mots-clés
  ciblés Douala, Akwa, livraison, traiteur (`data/seo.ts` + `components/seo/PageHead.tsx`)
- Données structurées Schema.org `Restaurant` (JSON-LD) injectées sur
  toutes les pages (`components/seo/StructuredData.tsx`)
- `public/robots.txt` et `public/sitemap.xml` inclus (à mettre à jour avec
  le nom de domaine définitif)
- Rendu **statique** (une page HTML par route) : le contenu est visible par
  les moteurs de recherche sans exécution de JavaScript

## 📱 Conversion

- Barre d'actions fixe en bas de l'écran sur mobile : **Appeler / WhatsApp /
  Itinéraire** (`components/layout/StickyMobileBar.tsx`)
- **Panier multi-plats** : bouton "Ajouter au panier" bien visible sur
  chaque plat, icône panier avec compteur dans l'en-tête, quantités et
  notes modifiables, mode de réception (sur place / à emporter /
  livraison) avec **adresse de livraison demandée directement** dès que
  ce mode est choisi. Envoi groupé en un seul message WhatsApp
  (`context/CartContext.tsx`, `components/cart/`)
- **Formulaires de demande par service** : cliquer sur un service
  (mariages, anniversaires, baptêmes, sur place, livraison) ouvre un
  formulaire dédié (`/services/<id>`) dont les champs s'adaptent au
  service, puis compose le message WhatsApp automatiquement
  (`components/services/ServiceRequestForm.tsx`)
- Formulaire de contact général qui compose directement un message
  WhatsApp (pas besoin de serveur mail pour cette version)

Détails complets de ces deux flux dans `FICHE_TECHNIQUE.md` (§8 et §9).

---

Site conçu et développé par **KN WEB & TECHNOLOGY**.
