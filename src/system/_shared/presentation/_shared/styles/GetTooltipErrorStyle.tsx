import { Theme } from '@mui/material';

export const getTooltipErrorStyle = (theme: Theme) => ({
  arrow: {
    backgroundColor: 'transparent',
    color: theme.palette.error.main,
  },
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.main}`,
  },
});
