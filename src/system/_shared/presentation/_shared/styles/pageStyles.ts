import { SxProps, Theme, useMediaQuery } from '@mui/material';

export const getPageStyles = <Sx extends SxProps>(sx?: Sx) => ({
  page: {
    pl: 2,
    pr: 2,
    headerWithActions: (theme: Theme) => {
      const lessThanTablet = useMediaQuery(theme.breakpoints.down('tablet'));
      const lessThanDesktop = useMediaQuery(theme.breakpoints.down('desktop'));
      const mainClass: SxProps = {
        display: 'flex',
        flexDirection: lessThanDesktop ? 'column' : 'row',
        mt: 2,
        mb: 2,
      };
      const actionsContainer: SxProps = {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
      };
      if (lessThanDesktop) {
        actionsContainer.mt = 2;
      }
      if (lessThanTablet) {
        mainClass.flexDirection = 'column';
      } else {
        mainClass.alignSelf = 'stretch';
      }
      return {
        ...mainClass,
        '& .title': {
          display: 'inline-flex',
          alignItems: 'center',
          mr: 2,
        },
        '& .actionsContainer': actionsContainer,
      };
    },
    ...sx,
  },
});
