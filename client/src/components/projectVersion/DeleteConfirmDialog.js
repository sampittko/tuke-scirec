import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@material-ui/core';

import DialogTransition from '../common/DialogTransition';
import React from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {deleteProjectVersion} from "../../store/actions/projectVersionActions";

class DeleteConfirmDialog extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.onClick();
    await this.props.deleteProjectVersion();
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        TransitionComponent={DialogTransition}
      >
        <form onSubmit={this.handleSubmit}>
          <DialogTitle>Vymazanie verzie projektu</DialogTitle>
          <DialogContent>
            <Typography>
              Naozaj si prajete vykonať túto akciu? <span style={{fontWeight: 500}}>Akcia je nenávratná!</span>
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
              Vymazať verziu {this.props.activeProjectVersion.data().versionNum}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

DeleteConfirmDialog.propTypes = {
  open: propTypes.bool.isRequired,
  activeProjectVersion: propTypes.object.isRequired,
  deleteProjectVersion: propTypes.func.isRequired,
  onClick: propTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProjectVersion: async () => dispatch(deleteProjectVersion()),
  }
};

const mapStateToProps = state => {
  return {
    activeProjectVersion: state.projectVersion.data.active,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteConfirmDialog);