/**
 * Design tokens — Les Délices d'Afrique
 * -------------------------------------------------
 * Direction artistique (cahier des charges §2 & §8) :
 * "Haut standing à prix abordable" — élégance, chaleur, confort,
 * modernité, gastronomie, touche africaine subtile.
 *
 * Palette : or/jaune en accent, associé à des tons neutres
 * profonds (noir chaud) et clairs (ivoire/crème).
 * Une pointe de terracotta rappelle la cuisine et les épices
 * sans tomber dans le cliché "drapeau".
 */

export const colors = {
  // Couleur de marque — à ajuster si le client fournit une charte précise
  gold: '#C9A227',
  goldLight: '#E8C468',
  goldDeep: '#9C7A16',

  charcoal: '#181410',
  charcoalSoft: '#241E17',

  cream: '#FBF6EC',
  ivory: '#F3EAD6',
  white: '#FFFFFF',

  terracotta: '#A6461F',
  terracottaLight: '#C97B4A',

  success: '#3C8A54', // WhatsApp / confirmation
  overlay: 'rgba(20, 16, 11, 0.55)',
  overlayLight: 'rgba(20, 16, 11, 0.25)',

  textPrimary: '#1C1712',
  textMuted: '#5B5245',
  textOnDark: '#F3EAD6',
  textOnDarkMuted: '#C9BEA9',

  border: '#E7DCC3',
  borderDark: '#332A1F',
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 20,
  lg: 32,
  xl: 48,
  xxl: 72,
  xxxl: 104,
} as const;

export const radii = {
  sm: 8,
  md: 14,
  lg: 22,
  pill: 999,
} as const;

export const shadow = {
  card: {
    shadowColor: '#1C1712',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
  raised: {
    shadowColor: '#1C1712',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.16,
    shadowRadius: 32,
    elevation: 8,
  },
} as const;

// Fraunces (display) : serif chaleureuse et gastronomique, plus singulière
// qu'un Playfair Display, avec des empattements souples "faits main".
// Manrope (texte) : sans-serif géométrique et moderne, très lisible mobile.
export const fonts = {
  display: 'Fraunces_600SemiBold',
  displayItalic: 'Fraunces_500Medium_Italic',
  displayBold: 'Fraunces_700Bold',
  body: 'Manrope_400Regular',
  bodyMedium: 'Manrope_500Medium',
  bodySemiBold: 'Manrope_600SemiBold',
  bodyBold: 'Manrope_700Bold',
} as const;

export const type = {
  eyebrow: { fontSize: 13, letterSpacing: 2.2, lineHeight: 16 },
  h1: { fontSize: 44, lineHeight: 48 },
  h1Mobile: { fontSize: 34, lineHeight: 38 },
  h2: { fontSize: 32, lineHeight: 38 },
  h2Mobile: { fontSize: 26, lineHeight: 32 },
  h3: { fontSize: 22, lineHeight: 28 },
  body: { fontSize: 16, lineHeight: 25 },
  bodyLg: { fontSize: 18, lineHeight: 28 },
  small: { fontSize: 13, lineHeight: 19 },
} as const;

// Breakpoint simple utilisé par les composants pour adapter la mise en page
export const breakpoints = {
  tablet: 768,
  desktop: 1080,
  wide: 1280,
} as const;

export const maxContentWidth = 1180;
