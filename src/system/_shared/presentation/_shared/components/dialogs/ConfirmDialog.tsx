import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import { TTranslateFunction } from '../../../../../Internalization/domain/entities/IInternalizationMessage';

interface confirmDialogProps {
  open: boolean;
  title: string;
  handleClose: () => void;
  handleCancel: () => void;
  handleConfirm: () => void;
  children?: JSX.Element | Array<JSX.Element>;
  translateMessage: TTranslateFunction;
}

export default function ConfirmDialog(props: confirmDialogProps) {
  const {
    open = false,
    title = '',
    children,
    handleClose = () => {},
    handleConfirm = () => {},
    handleCancel = () => {},
    translateMessage,
  } = props;
  const id = Math.random();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby={`confirm-dialog-${id}-title`}
    >
      <DialogTitle id={`confirm-dialog-${id}-title`}>
        {title}
        {handleClose ? (
          <IconButton aria-label="close" onClick={handleClose} />
        ) : null}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleCancel}>
          {translateMessage({ id: 'system.button.action.cancel' })}
        </Button>
        <Button onClick={handleConfirm}>
          {translateMessage({ id: 'system.button.action.continue' })}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
