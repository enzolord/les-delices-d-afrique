import React from 'react';
// Import interne (non exposé publiquement par expo-router) — voir le
// commentaire ci-dessous pour la raison de ce contournement.
// @ts-ignore — pas de types publics pour ce chemin interne
import { IsFocusedContext } from 'expo-router/build/react-navigation/core/useIsFocused';

/**
 * Contournement — expo-router 57.x / rendu statique web.
 * -------------------------------------------------------
 * Le composant `<Head>` de `expo-router/head` n'affiche son contenu que si
 * `useIsFocused()` retourne `true`. Lors de l'export statique
 * (`expo export --platform web`), chaque route est rendue côté Node.js en
 * une seule passe synchrone : aucun événement de navigation "focus" ne se
 * déclenche jamais, donc `useIsFocused()` retourne `false` et TOUTES les
 * balises <title>/<meta> définies via <Head> sont silencieusement ignorées
 * dans le HTML statique — cassant le SEO alors même que le contenu visible
 * s'affiche correctement.
 *
 * Comme l'export statique ne rend qu'une seule route à la fois (un fichier
 * HTML par route), il est toujours correct de considérer cette route comme
 * "focused". Ce provider force donc `IsFocusedContext` à `true` pour tout
 * l'arbre, ce qui débloque le rendu de `<Head>` sans rien changer au
 * comportement de navigation réel sur natif/dev (le contexte n'est utilisé
 * que pour cette vérification de focus).
 *
 * À retirer si une future version d'expo-router corrige ce comportement
 * pour le rendu statique.
 */
export function ForceFocusedProvider({ children }: { children: React.ReactNode }) {
  return <IsFocusedContext.Provider value={true}>{children}</IsFocusedContext.Provider>;
}
