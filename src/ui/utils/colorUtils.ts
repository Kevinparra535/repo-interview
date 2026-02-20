/**
 * Converts a hex color string (#RRGGBB or #RGB) plus an alpha value
 * into a CSS-compatible `rgba(r, g, b, alpha)` string.
 *
 * @example
 *   hexToRgba('#FFFFFF', 0.08)  // 'rgba(255,255,255,0.08)'
 *   hexToRgba('#2D7EF8', 0.31)  // 'rgba(45,126,248,0.31)'
 */
export function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');

  let r: number;
  let g: number;
  let b: number;

  if (clean.length === 3) {
    r = Number.parseInt(clean[0] + clean[0], 16);
    g = Number.parseInt(clean[1] + clean[1], 16);
    b = Number.parseInt(clean[2] + clean[2], 16);
  } else {
    r = Number.parseInt(clean.substring(0, 2), 16);
    g = Number.parseInt(clean.substring(2, 4), 16);
    b = Number.parseInt(clean.substring(4, 6), 16);
  }

  return `rgba(${r},${g},${b},${alpha})`;
}
