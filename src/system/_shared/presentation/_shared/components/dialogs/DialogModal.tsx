import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';

interface IDialogModal {
  open: boolean;
  title: string;
  handleClose?: () => void;
  actions?: JSX.Element | Array<JSX.Element>;
  content?: JSX.Element | Array<JSX.Element>;
}

export default function DialogModal(props: IDialogModal) {
  const {
    open = false,
    title = '',
    content,
    actions,
    handleClose = () => {},
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
        {/*{handleClose ? (*/}
        {/*  <IconButton sx={{alignSelf: 'right'}} aria-label="close" onClick={handleClose} />*/}
        {/*) : null}*/}
      </DialogTitle>
      <DialogContent>
        {content}
      </DialogContent>
      <DialogActions>
        {actions}
      </DialogActions>
    </Dialog>
  );
}
