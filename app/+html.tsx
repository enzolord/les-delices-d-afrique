import { ScrollViewStyleReset } from 'expo-router/html';
import React from 'react';

/**
 * Ce fichier ne s'exécute que lors de l'export web statique
 * (`expo export --platform web`, output "static" dans app.json).
 * Il définit le document HTML racine, utilisé pour CHAQUE route
 * pré-rendue — d'où son importance pour le SEO technique (CdC §22).
 */
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#C9A227" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="KN WEB & TECHNOLOGY" />

        {/*
          Performance (CdC §26) : les polices sont servies depuis le site
          (public/fonts, .woff2 allégés ~15 Ko chacun) et déclarées ici, dans le
          HTML statique. Le texte s'affiche immédiatement (font-display: swap)
          au lieu d'attendre le chargement de tout le JavaScript.
          On précharge les 2 polices visibles au-dessus de la ligne de flottaison.
        */}
        <link rel="preload" href="/fonts/Manrope_400Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Fraunces_600SemiBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{ __html: fontFaces }} />

        {/*
          Reset du fond blanc par défaut de react-native-web sur le
          conteneur de scroll — évite un flash visuel au chargement.
        */}
        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const FONT_FILES = [
  'Fraunces_500Medium_Italic',
  'Fraunces_600SemiBold',
  'Fraunces_700Bold',
  'Manrope_400Regular',
  'Manrope_500Medium',
  'Manrope_600SemiBold',
  'Manrope_700Bold',
];

const fontFaces = FONT_FILES.map(
  (name) =>
    `@font-face{font-family:"${name}";src:url("/fonts/${name}.woff2") format("woff2");font-display:swap}`,
).join('');

const responsiveBackground = `
  html, body, #root { background-color: #FBF6EC; }
  * { -webkit-tap-highlight-color: transparent; }
`;
