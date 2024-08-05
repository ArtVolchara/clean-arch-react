import React from 'react';

import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Box, Card, CardContent, CardHeader, ToggleButton, Typography } from '@mui/material';

import { collapsibleSidebarStyle } from '../../../styles/CollapsibleSidebarStyle';

interface IOptionBlockProps {
  title: string;
  titleAction?: React.ReactNode;
  collapseProps?: {
    id: string;
    isReversed: boolean;
    collapsed: string | null;
    setCollapsed: (id: string | null) => void
  }
  children?: JSX.Element | JSX.Element[];
}

function OptionBlock(props:IOptionBlockProps) {
  const {
    title,
    titleAction,
    collapseProps: {
      id = `${Math.random()}`,
      isReversed = false,
      collapsed = null,
      setCollapsed = () => {},
    } = {},
    children = [],
  } = props;
  const classes = collapsibleSidebarStyle;
  const toggleCollapsed = () => {
    if (id === collapsed) {
      setCollapsed(null);
    } else {
      setCollapsed(id);
    }
  };

  const getArrowButton = (collapsed:string, isReversed:boolean) => {
    if (!isReversed) {
      return collapsed === id ? <ArrowBackIosNew color="primary" fontSize="small" /> : <ArrowForwardIos color="primary" fontSize="small" />;
    }
    return collapsed === id ? <ArrowForwardIos color="primary" fontSize="small" /> : <ArrowBackIosNew color="primary" fontSize="small" />;
  };
  return (
    <Box sx={classes.optionBlock(id, isReversed, collapsed)}>
      <Card
        sx={classes.optionBlockInfo(collapsed, isReversed, id)}
      >
        <CardHeader
          sx={classes.title(id, isReversed, collapsed)}
          title={<Typography variant="h6">{title}</Typography>}
          action={collapsed === id ? titleAction : null}
        />
        <CardContent sx={classes.optionBlockInfoContent(id, isReversed, collapsed)}>
          <Box sx={classes.directionWrapper}>
            {children}
          </Box>
        </CardContent>
      </Card>
      <Box sx={classes.buttonContainer}>
        <ToggleButton
          value="collapse"
          selected={collapsed === id}
          color="primary"
          sx={classes.arrowButton}
          onClick={toggleCollapsed}
        >
          {getArrowButton(collapsed, isReversed)}
        </ToggleButton>
      </Box>
    </Box>
  );
}
export default OptionBlock;
