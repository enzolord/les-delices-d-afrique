# Où déposer vos photos

Déposez simplement vos fichiers ici, au format **.webp**, avec EXACTEMENT le
nom indiqué. Le site les affiche automatiquement — aucune modification de
code nécessaire. Un plat/item sans photo continue d'afficher un bloc
"photo à venir" (pas de bug, pas de photo cassée).

Pourquoi .webp ? C'est un format d'image nettement plus léger qu'un .jpg à
qualité équivalente, ce qui accélère le chargement du site sur mobile — un
critère qui compte pour le référencement local. Convertissez vos photos avec
https://squoosh.app (menu de droite → choisir "WebP").

## public/images/restaurant/  (5 fichiers, noms fixes)
- hero.webp          → grande photo d'accueil (Hero)
- interieur.webp      → aperçu intérieur (accueil)
- chef.webp            → page "Le restaurant"
- salle.webp            → page "Le restaurant"
- ambiance.webp          → page "Le restaurant"

## public/images/menu/   (nom = id du plat dans data/menu.ts)
Exemples : rs-poisson.webp, rs-biftek.webp, pdt-poulet.webp, wk-riz-water-poule.webp...
→ Liste complète des id dans data/menu.ts (46 plats). Vous n'êtes pas obligé
de toutes les fournir : commencez par les plats "Populaire" et "Spécial week-end".

## public/images/services/   (nom = id du service dans data/services.ts)
- sur-place.webp
- livraison.webp
- mariages.webp
- anniversaires.webp
- baptemes.webp

## public/images/gallery/   (nom = id de l'item dans data/gallery.ts)
- g1.webp, g2.webp, g3.webp, g4.webp, g5.webp, g6.webp, g7.webp, g8.webp, g9.webp
(vous pouvez aussi éditer data/gallery.ts pour changer les légendes)

## Recommandations techniques
- Format : .webp (obligatoire — voir utils/images.ts)
- Poids : idéalement < 200 Ko par photo
- Cadrage : privilégier le format portrait/carré pour les plats, paysage pour la salle
