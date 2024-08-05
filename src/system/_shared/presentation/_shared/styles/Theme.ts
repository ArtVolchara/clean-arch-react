import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material';
import { PaletteOptions } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    desktop: true;
    large: true;
  }
}

const palette:PaletteOptions = {
  primary: { main: '#1164C0' },
  secondary: { main: '#6BEAC7' },
  text: {
    // primary: '#333F48'
  },
  background: {
    // paper: '#EEF3FF',
    // default: '#EEF3FF',
  },
};

const themeOptions:ThemeOptions = {
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      desktop: 1024,
      large: 1200,
    },
  },
  typography: {
    fontFamily: 'PT Sans',
    // fontFamily: 'SB Sans Text',
    fontSize: 12,
    // h1: {
    //   fontFamily: 'SB Sans Display',
    // },
    // h2: {
    //   fontFamily: 'SB Sans Display',
    // },
    // h3: {
    //   fontFamily: 'SB Sans Display',
    // },
    // h4: {
    //   fontFamily: 'SB Sans Display',
    // },
    // h5: {
    //   fontFamily: 'SB Sans Display',
    // },
    // h6: {
    //   fontFamily: 'SB Sans Display',
    // },
    // subtitle1: {
    //   fontFamily: 'SB Sans Display',
    // },
    // subtitle2: {
    //   fontFamily: 'SB Sans Display',
    // },
    // body1: {
    //   fontFamily: 'SB Sans Text',
    // },
    // body2: {
    //   fontFamily: 'SB Sans Text',
    // },
    // caption: {
    //   fontFamily: 'SB Sans Text',
    // },
    // button: {
    //   fontFamily: 'SB Sans Text',
    // },
    // overline: {
    //   fontFamily: 'SB Sans Text',
    // },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        filled: {
          transform: 'translate(12px, 3px) scale(0.75)',
        },
      },
    },
    MuiInputBase: {
      variants: [
        {
          props: { size: 'medium' },
          style: {
            // '.MuiInputBase-input': {
            //   paddingTop: '12.5px',
            //   paddingBottom: '12.5px',
            // },
          },
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { size: 'large' },
          style: ({ theme }) => ({
            minHeight: `calc(${theme.typography.htmlFontSize}px * 1.235 + ${16.5 * 2}px)`,
          }),
        },
        {
          props: { size: 'medium' },
          style: ({ theme }) => ({
            minHeight: `calc(${theme.typography.htmlFontSize}px * 1.235 + ${8.5 * 2}px)`,
          }),
        },
      ],
    },
    MuiToggleButton: {
      variants: [
        {
          props: { size: 'large' },
          style: ({ theme }) => ({
            minHeight: `calc(${theme.typography.htmlFontSize}px * 1.4375 +  ${16.5 * 2}px)`,
          }),
        },
        {
          props: { size: 'medium' },
          style: ({ theme }) => ({
            padding: '6px',
            minHeight: `calc(${theme.typography.htmlFontSize}px * 1.4375 +  ${8.5 * 2}px)`,
          }),
        },
      ],
    },
  },
  palette,

};
const theme = responsiveFontSizes(createTheme(themeOptions));
export default theme;
