import React, { ReactElement } from 'react';
import { Check, Close } from '@mui/icons-material';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { observer } from 'mobx-react';
import { ENotificationVariants } from '../../../domain/entities/INotificationMessage';
import { TNotificationRendererDeps } from '../../../application/ports/output/presentationInterfaces/INotificationRenderer';

const NotificationRendererView = observer(function NotificationRenderer(...[props]: TNotificationRendererDeps): ReactElement<typeof props, typeof NotificationRenderer> {
  const { sendNotificationUseCase: sendNotification, getNotificationUseCase: getNotification } = props;
  const notification = getNotification();
  const variant = notification?.options?.variant;
  const icon = variant === 'success' ? <Check fontSize="inherit" /> : undefined;
  return (
    <Snackbar
      sx={{ position: 'absolute' }}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={!!notification}
      autoHideDuration={6000}
      onClose={() => sendNotification(null)}
      message={notification?.message || ''}
    >
      {variant && variant !== ENotificationVariants.default ? (
        <Alert
          icon={icon}
          severity={variant}
          onClose={() => sendNotification(null)}
          action={(
            <IconButton
              size="small"
              aria-label="close"
              onClick={() => sendNotification(null)}
            >
              <Close fontSize="small" />
            </IconButton>
        )}
        >
          {notification?.message}
        </Alert>
      )
        : null}
    </Snackbar>
  );
});

export default NotificationRendererView