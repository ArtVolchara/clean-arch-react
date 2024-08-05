import React, { Children, useState } from 'react';

import { Backdrop, Box, Paper, SxProps, Theme, useTheme } from '@mui/material';
import { collapsibleSidebarStyle } from '../../../styles/CollapsibleSidebarStyle';

interface ICollapsableSideBarProps {
  collapseSide: 'left' | 'right';
  sx?: Omit<SxProps, 'theme'>;
  onCollapse?: (collapsedOption: string | null) => void;
  children: JSX.Element | JSX.Element[];
}

export default function CollapsableSideBar(props:ICollapsableSideBarProps) {
  const { collapseSide = 'right', children, onCollapse = () => {}, sx = {} } = props;
  const [collapsedOption, setCollapsedOption] = useState(null);
  const theme = useTheme();
  const classes = collapsibleSidebarStyle;
  const handleCollapse = (collapsedOption: string | null) => {
    setCollapsedOption(collapsedOption);
    onCollapse(collapsedOption);
  };
  return (
    <Paper elevation={4} sx={{ ...sx, ...classes.sidebarPaper(collapseSide, collapsedOption, theme) }}>
      <Box sx={classes.sideBarContent}>
        {Children.map(children, (child, index) => React.cloneElement(child, {
          collapseProps: {
            id: `option-${index}`,
            collapsed: collapsedOption,
            setCollapsed: handleCollapse,
            isReversed: collapseSide === 'left',
          },
        }))}
      </Box>
    </Paper>
  );
}
