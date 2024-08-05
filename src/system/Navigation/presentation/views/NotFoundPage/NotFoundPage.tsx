import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { ArrowRightAlt } from '@mui/icons-material';
import NotFoundPageStyles from './styles/NotFoundPageStyles';
import {
  TNotFoundPage,
  TNotFoundPageDeps,
} from '../../../application/ports/output/presentationInterfaces/INotFoundPage';
import { HOME_PATH } from '../../../../_shared/domain/configs/configs';
import { ReactElement } from 'react';

export default function NotFoundPage<Deps extends TNotFoundPageDeps>(...[props]: Deps): ReactElement<Deps[0], typeof NotFoundPage> {
  const { translateMessageUseCase: translateMessage, navigateUseCase: navigate, getPreviousLocationUseCase: getPreviousLocation } = props;
  const classes = NotFoundPageStyles;
  const theme = useTheme();
  return (
    <Box sx={classes.notFoundPage}>
      <Stack
        direction="row"
        spacing={16}
        alignSelf="center"
        maxWidth="70%"
        maxHeight="70%"
      >
        <Typography
          sx={{
            fontSize: `calc(3 * ${theme.typography.h1.fontSize})`,
          }}
          variant="h1"
          margin="auto 0"
          color="primary"
        >
          404
        </Typography>
        <Stack
          direction="column"
          spacing={2}
          justifyContent="center"
          alignItems="flex-start"
        >
          <Typography
            variant="h2"
            mb={1}
          >
            {translateMessage({ id: 'system.navigation.notFoundPage.title' })}
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
          >
            {translateMessage({ id: 'system.navigation.notFoundPage.message' })}
          </Typography>
          <Button
            variant="contained"
            endIcon={<ArrowRightAlt />}
            onClick={() => navigate([getPreviousLocation() || HOME_PATH])}
          >
            {translateMessage({ id: 'system.navigation.action.goBack' })}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

