/**
 * Natif (iOS/Android) : on utilise react-native-svg.
 * Sur le web, Metro charge `svg.web.tsx` à la place (balises <svg> natives
 * du navigateur) → ~110 Ko de JavaScript en moins dans le bundle web.
 */
export { default as Svg, Path, Polyline } from 'react-native-svg';
