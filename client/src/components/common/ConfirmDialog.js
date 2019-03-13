import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';

import React from 'react';
import propTypes from 'prop-types';

const ConfirmDialog = props =>
  <Dialog open={props.open}>
    <DialogTitle>{props.title}</DialogTitle>
    <DialogContent>
      <Typography>
        {props.content}
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onNegativeClick}>
        Zrušiť
      </Button>
      <Button onClick={props.onPositiveClick} color="secondary">
        Potvrdiť
      </Button>
    </DialogActions>
  </Dialog>;

ConfirmDialog.propTypes = {
  open: propTypes.bool.isRequired,
  title: propTypes.string.isRequired,
  content: propTypes.string.isRequired,
  onNegativeClick: propTypes.func.isRequired,
  onPositiveClick: propTypes.func.isRequired,
}

export default ConfirmDialog;