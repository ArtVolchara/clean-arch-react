import React, { ReactElement } from 'react';
import { Container, useTheme } from '@mui/material';
import { observer } from 'mobx-react';
import ModulesLayoutPageStyles from './styles/ModulesLayoutPageStyles';
import ApplicationBar from './components/ApplicationBar';
import { TModulesLayoutPageDeps } from '../../../application/ports/output/presentationInterfaces/IModulesLayoutPage';
import { TViewElement, TViewElementFactory, TViewElements } from 'system/_shared/domain/entities/Presentation/ViewElement/TViewElement';
import IUseCase from 'system/_shared/domain/entities/Application/UseCase/IUseCase';

const ModulesLayoutPage= observer(function ModulesLayout<const Deps extends TModulesLayoutPageDeps<TViewElements>>(...[props]: Deps): ReactElement<Deps[0], typeof ModulesLayout> {
  const { translateMessageUseCase: translateMessage, primaryControls, endControls, children } = props;
  const theme = useTheme();
  const classes = ModulesLayoutPageStyles;
  return (
    <Container disableGutters maxWidth={false} sx={classes.modulesLayoutPage}>
      <ApplicationBar
        theme={theme}
        translateMessageUseCase={translateMessage}
        primaryControls={primaryControls}
        endControls={endControls}
      />
      <Container disableGutters maxWidth={false} sx={classes.pageContainer}>
        {children}
      </Container>
    </Container>
  );
});

export default ModulesLayoutPage;