import React from 'react';

/**
 * Version web de `svg.tsx` : simples balises SVG du navigateur, rendues
 * directement dans le HTML statique (visibles avant le chargement du JS)
 * et sans embarquer la librairie react-native-svg.
 */
type SvgProps = React.SVGProps<SVGSVGElement>;

export function Svg({ children, ...props }: SvgProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }} {...props}>
      {children}
    </svg>
  );
}

export function Path(props: React.SVGProps<SVGPathElement>) {
  return <path {...props} />;
}

export function Polyline(props: React.SVGProps<SVGPolylineElement>) {
  return <polyline {...props} />;
}
