import { Platform } from 'react-native';
import { useFonts } from 'expo-font';
// Imports par sous-chemin : n'embarque QUE les graisses utilisées
// (l'import racine du paquet référence les 18 graisses de chaque famille).
import { Fraunces_500Medium_Italic } from '@expo-google-fonts/fraunces/500Medium_Italic';
import { Fraunces_600SemiBold } from '@expo-google-fonts/fraunces/600SemiBold';
import { Fraunces_700Bold } from '@expo-google-fonts/fraunces/700Bold';
import { Manrope_400Regular } from '@expo-google-fonts/manrope/400Regular';
import { Manrope_500Medium } from '@expo-google-fonts/manrope/500Medium';
import { Manrope_600SemiBold } from '@expo-google-fonts/manrope/600SemiBold';
import { Manrope_700Bold } from '@expo-google-fonts/manrope/700Bold';

/**
 * Sur le WEB, les polices sont déclarées directement dans le HTML statique
 * (voir app/+html.tsx → @font-face en .woff2 + preload, font-display: swap).
 * Le texte s'affiche donc avec la bonne police dès le premier rendu, sans
 * attendre le JavaScript. On ne charge les .ttf via expo-font que sur natif.
 */
const nativeFonts =
  Platform.OS === 'web'
    ? {}
    : {
        Fraunces_600SemiBold,
        Fraunces_700Bold,
        Fraunces_500Medium_Italic,
        Manrope_400Regular,
        Manrope_500Medium,
        Manrope_600SemiBold,
        Manrope_700Bold,
      };

export function useAppFonts() {
  const [loaded, error] = useFonts(nativeFonts);
  return { fontsLoaded: Platform.OS === 'web' ? true : loaded, fontError: error };
}
