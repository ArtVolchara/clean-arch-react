import { SxProps, Theme } from '@mui/material';

function getInfoFlexDirection(id:string, collapsed:string, isReversed:boolean) {
  if (id === collapsed) {
    return 'column';
  }
  return isReversed ? 'row-reverse' : 'row';
}

export const collapsibleSidebarStyle = {
  sidebarPaper: (collapseSide: 'left' | 'right', collapsedOption: string | null, theme: Theme):SxProps => ({
    height: '100%',
    maxHeight: '100%',
    minWidth: collapsedOption ? theme.breakpoints.values.tablet / 2 : `calc((${theme.typography.button.fontSize} * ${theme.typography.button.lineHeight} + ${theme.spacing(0.5)})
    + ${theme.typography.h6.fontSize} * ${theme.typography.h6.lineHeight})`,
    maxWidth: collapsedOption ? theme.breakpoints.values.tablet / 2 : `calc((${theme.typography.button.fontSize} * ${theme.typography.button.lineHeight} + ${theme.spacing(0.5)})
    + ${theme.typography.h6.fontSize} * ${theme.typography.h6.lineHeight})`,
    display: 'flex',
    flexDirection: 'column',
    left: collapseSide === 'right' ? 0 : 'auto',
    right: collapseSide === 'left' ? 0 : 'auto',
    transition: 'min-width 0.5s !important',
    pointerEvents: 'auto',
  }),
  sideBarContent: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    width: '100%',
  },
  optionBlock: (id: string, isReversed: boolean, collapsed: string | null):SxProps => ({
    display: 'flex',
    width: '100%',
    height: '100%',
    flex: id === collapsed || !collapsed ? 1 : 0,
    // бага flexbox, не убирать minHeight = 0
    minHeight: id === collapsed || !collapsed ? 0 : undefined,
    flexDirection: isReversed ? 'row-reverse' : 'row',
    justifyContent: 'center',
    transition: 'flex 0.9s',
  }),
  optionBlockInfo: (id: string, isReversed: boolean, collapsed: string | null):SxProps => ({
    display: 'flex',
    height: '100%',
    flex: 1,
    minHeight: 0,
    minWidth: 0,
    flexDirection: getInfoFlexDirection(id, collapsed, isReversed),
    boxSizing: 'border-box',
    overflow: 'hidden',
    boxShadow: 'none',
  }),
  optionBlockInfoContent: (id: string, isReversed: boolean, collapsed: string | null):SxProps => ({
    display: id === collapsed ? 'flex' : 'none',
    direction: isReversed ? 'ltr' : 'rtl',
    height: '100%',
    flex: 1,
    minHeight: 0,
    minWidth: 0,
    overflow: 'scroll',
    paddingBottom: '0 !important',
    marginBottom: 3,
  }),
  directionWrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    direction: 'ltr',
  },
  buttonContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'stretch',
    alignSelf: 'center',
  },
  arrowButton: {
    minWidth: 'auto !important',
    padding: 0.5,
    border: 'none',
    borderRadius: 0,
    verticalAlign: 'middle',
  },
  title: (id: string, isReversed: boolean, collapsed: string | null):SxProps => ({
    display: 'flex',
    alignItems: 'center',
    padding: collapsed ? undefined : '0px',
    textAlign: 'center',
    alignContent: 'center',
    writingMode: collapsed ? 'horizontal-tb' : 'vertical-rl',
    transform: !isReversed && !collapsed ? 'rotate(-180deg)' : 'none',
    '& .MuiCardHeader-action': {
      m: 0,
    },
  }),
};
