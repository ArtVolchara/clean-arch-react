import { decomposeColor, hexToRgb } from '@mui/material';

export default function getRgbWithOpacityFromHexColor(color: string, opacity?: number) {
  const { values: [r, g, b, a] } = decomposeColor(hexToRgb(color));
  return opacity || a ? `rgba(${r}, ${g}, ${b}, ${opacity || a})` : `rgb(${r}, ${g}, ${b})`;
}
