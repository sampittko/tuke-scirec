import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@material-ui/core';

import DialogTransition from '../common/DialogTransition';
import React from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {deleteFile} from "../../store/actions/fileActions";

class DeleteConfirmDialog extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.onClick();
    this.props.deleteFile(this.props.fileToDelete, this.props.filesIndex);
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        TransitionComponent={DialogTransition}
      >
        <form onSubmit={this.handleSubmit}>
          <DialogTitle>Vymazanie súboru</DialogTitle>
          <DialogContent>
            <Typography>
              Naozaj si prajete vymazať súbor <span
              className="text-italic">{this.props.fileToDelete.data().name}</span>? <span className="text-bolder">Akcia je nenávratná!</span>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.props.onClick}
              disabled={this.props.isProjectLoading}
              type="button"
            >
              Zrušiť
            </Button>
            <Button type="submit" color="secondary">
              Vymazať súbor
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

DeleteConfirmDialog.propTypes = {
  open: propTypes.bool.isRequired,
  fileToDelete: propTypes.object,
  filesIndex: propTypes.number.isRequired,
  onClick: propTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    deleteFile: (file, filesIndex) => dispatch(deleteFile(file, filesIndex)),
  }
};

export default connect(null, mapDispatchToProps)(DeleteConfirmDialog);