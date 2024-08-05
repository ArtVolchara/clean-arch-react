import { Container } from '@mui/material';
import { observer } from 'mobx-react';
import RootLayoutPageStyles from './styles/RootLayoutPageStyles';
import { TRootLayoutPageDeps } from '../../../application/ports/output/presentationInterfaces/IRootLayoutPage';
import { ReactElement } from 'react';
import { TViewElements } from 'system/_shared/domain/entities/Presentation/ViewElement/TViewElement';

const RootLayoutPage = observer(function RootLayout <const Deps extends TRootLayoutPageDeps<TViewElements>>(...[props]: Deps): ReactElement<Deps[0], typeof RootLayout> {
  const classes = RootLayoutPageStyles;
  const { children } = props;
  return (
    <Container disableGutters maxWidth={false} sx={classes.rootLayoutPage}>
      <Container disableGutters maxWidth={false} sx={classes.pageContainer}>
        {children}
      </Container>
    </Container>
  );
});

export default RootLayoutPage