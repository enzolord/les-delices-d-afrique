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

        {/* Préconnexion aux polices Google pour améliorer le LCP (CdC §26) */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

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

const responsiveBackground = `
  html, body, #root { background-color: #FBF6EC; }
  * { -webkit-tap-highlight-color: transparent; }
`;
