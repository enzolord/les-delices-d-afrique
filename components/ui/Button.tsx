import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, StyleProp, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fonts, radii, spacing } from '@/constants/theme';

type Variant = 'primary' | 'secondary' | 'dark' | 'whatsapp' | 'ghost';
type Size = 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  icon?: keyof typeof Feather.glyphMap;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  loading?: boolean;
  href?: string; // for accessibility hint only, actual navigation handled by caller
}

const VARIANT_STYLES: Record<Variant, { bg: string; border?: string; text: string; pressedBg: string }> = {
  primary: { bg: colors.gold, text: colors.charcoal, pressedBg: colors.goldDeep },
  secondary: { bg: 'transparent', border: colors.charcoal, text: "#F5F5DC", pressedBg: 'rgba(24,20,16,0.06)' },
  dark: { bg: colors.charcoal, text: colors.textOnDark, pressedBg: colors.charcoalSoft },
  whatsapp: { bg: colors.success, text: colors.white, pressedBg: '#2F6E43' },
  ghost: { bg: 'transparent', text: colors.charcoal, pressedBg: 'rgba(24,20,16,0.06)' },
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  style,
  fullWidth,
  loading,
}: ButtonProps) {
  const v = VARIANT_STYLES[variant];
  const isLg = size === 'lg';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed, hovered }: any) => [
        styles.base,
        {
          backgroundColor: pressed ? v.pressedBg : v.bg,
          borderWidth: v.border ? 1.5 : 0,
          borderColor: v.border,
          paddingVertical: isLg ? spacing.sm + 4 : spacing.sm,
          paddingHorizontal: isLg ? spacing.lg : spacing.md,
        },
        fullWidth && { width: '100%' },
        hovered && styles.hovered,
        style,
      ]}
    >
      {icon && iconPosition === 'left' && !loading && (
        <Feather name={icon} size={isLg ? 20 : 17} color={v.text} style={styles.iconLeft} />
      )}
      {loading ? (
        <ActivityIndicator color={v.text} size="small" />
      ) : (
        <Text
          style={[
            styles.label,
            { color: v.text, fontSize: isLg ? 17 : 15.5 },
          ]}
          numberOfLines={1}
        >
          {label}
        </Text>
      )}
      {icon && iconPosition === 'right' && !loading && (
        <Feather name={icon} size={isLg ? 20 : 17} color={v.text} style={styles.iconRight} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.pill,
    // @ts-ignore - web-only smooth transition, ignored on native
    transitionDuration: '150ms',
    cursor: 'pointer' as any,
  },
  hovered: {
    // @ts-ignore
    transform: [{ scale: 1.02 }],
  },
  label: {
    fontFamily: fonts.bodySemiBold,
    letterSpacing: 0.2,
  },
  iconLeft: { marginRight: spacing.xs },
  iconRight: { marginLeft: spacing.xs },
});