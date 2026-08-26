import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { maxContentWidth, spacing } from '@/constants/theme';
import { useResponsive } from '@/utils/useResponsive';

interface ContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Container({ children, style }: ContainerProps) {
  const { isTablet } = useResponsive();
  return (
    <View
      style={[
        styles.wrap,
        { paddingHorizontal: isTablet ? spacing.xl : spacing.md },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    maxWidth: maxContentWidth,
    alignSelf: 'center',
  },
});
