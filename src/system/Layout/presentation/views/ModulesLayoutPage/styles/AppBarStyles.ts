import { Theme } from '@mui/material';

const appBarStyles = (theme: Theme) => ({
  container: {
    flexDirection: 'row',
  },
  logo: {
    icon: {
      fontSize: '2.5rem',
      mt: 1,
      mr: 1,
      mb: 1,
    },
    text: {
      fontSize: theme.typography.h6.fontSize,
      lineHeight: theme.typography.h6.lineHeight,
      mr: 2,
      mt: '1px', // Корректировка шрифта по центру логотипа
      display: { mobile: 'none', tablet: 'flex' },
      fontWeight: 700,
      color: 'inherit',
      textDecoration: 'none',
    },
  },
  navlink: {
    mt: `calc((${theme.typography.h6.fontSize} * ${theme.typography.h6.lineHeight} - ${theme.typography.button.fontSize} * ${theme.typography.button.lineHeight}) / 2) !important`,
    color: 'inherit',
    letterSpacing: '.2rem',
    textTransform: 'uppercase',
    textDecoration: 'none',
    cursor: 'pointer',
    '&.active': {
      textDecoration: 'underline',
    },
  },
});

export default appBarStyles;
