import {
  AppBar,

  Container,
  Stack, Theme,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import Logo from '../styles/EADIcon';
import appBarStyles from '../styles/AppBarStyles';
import { ITranslateMessageUseCase } from '../../../../../Internalization/application/ports/input/ITranslateMessageUseCase';
import { TViewElements } from 'system/_shared/domain/entities/Presentation/ViewElement/TViewElement';

interface IAppProps {
  theme: Theme,
  translateMessageUseCase: ITranslateMessageUseCase,
  primaryControls?: TViewElements,
  endControls?: TViewElements,
}

export default function ApplicationBar(props: IAppProps) {
  const { theme, translateMessageUseCase: translateMessage, primaryControls = [], endControls = [] } = props;
  const classes = appBarStyles(theme);
  return (
    <AppBar position="static">
      <Container sx={classes.container}>
        <Toolbar disableGutters variant="dense">
          <Logo sx={{ display: { width: 'max-content', fill: theme.palette.primary.contrastText }, ...classes.logo.icon }} />
          <Typography
            noWrap
            component="span"
            sx={classes.logo.text}
          >
            {translateMessage({ id: 'system.app.name', defaultMessage: 'AI-Assistant' })}
          </Typography>
          <Stack alignSelf="stretch" alignItems="center" direction="row" spacing={2} flexGrow={1}>
            {primaryControls}
          </Stack>
          <Stack alignSelf="stretch" alignItems="center" direction="row" spacing={2} flexGrow={0}>
            {endControls}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
