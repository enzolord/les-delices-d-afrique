import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';
import { useResponsive } from '@/utils/useResponsive';
import { Header } from './Header';
import { Footer } from './Footer';
import { StickyMobileBar } from './StickyMobileBar';

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  const { isMobile } = useResponsive();
  return (
    <View style={styles.flex}>
      <Header />
      <ScrollView
        style={styles.flex}
        contentContainerStyle={isMobile ? styles.mobilePad : undefined}
        showsVerticalScrollIndicator={false}
      >
        {children}
        <Footer />
      </ScrollView>
      <StickyMobileBar />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.cream },
  mobilePad: { paddingBottom: 74 },
});
