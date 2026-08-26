import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAppFonts } from '@/utils/useAppFonts';
import { colors } from '@/constants/theme';
import { StructuredData } from '@/components/seo/StructuredData';
import { ForceFocusedProvider } from '@/utils/ForceFocusedProvider';
import { CartProvider } from '@/context/CartContext';
import { CartModal } from '@/components/cart/CartModal';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const { fontsLoaded, fontError } = useAppFonts();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  // ⚠️ Important pour le SEO (rendu statique) : ne JAMAIS retourner `null`
  // ici en attendant le chargement des polices. Sur web, cela viderait le
  // rendu statique de toute page (voir docs.expo.dev/router/web/static-rendering).
  // React Native applique automatiquement la police par défaut en attendant
  // le chargement de la police personnalisée (RN 0.72+), donc on peut rendre
  // l'arbre immédiatement sans attendre `fontsLoaded`.
  return (
    <ForceFocusedProvider>
      <SafeAreaProvider>
        <CartProvider>
          <StructuredData />
          <StatusBar style="dark" />
          <View style={{ flex: 1, backgroundColor: colors.cream }} onLayout={onLayoutRootView}>
            <Stack screenOptions={{ headerShown: false }} />
          </View>
          <CartModal />
        </CartProvider>
      </SafeAreaProvider>
    </ForceFocusedProvider>
  );
}
