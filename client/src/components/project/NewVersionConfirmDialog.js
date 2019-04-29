import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@material-ui/core';
import DialogTransition from '../common/DialogTransition';
import React from 'react';
import propTypes from 'prop-types';
import {connect} from "react-redux";
import {addProjectVersion} from "../../store/actions/projectVersionActions";

class NewVersionConfirmDialog extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.onClick();
    this.props.addProjectVersion();
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        TransitionComponent={DialogTransition}
      >
        <form onSubmit={this.handleSubmit}>
          <DialogTitle>Pridanie novej verzie projektu</DialogTitle>
          <DialogContent>
            <Typography>
              Naozaj si prajete pridať {this.props.activeProject.data().meta.versionsCount + 1}. verziu
              projektu {this.props.activeProject.data().title}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.props.onClick}
              type="button"
            >
              Zrušiť
            </Button>
            <Button
              type="submit"
              color="secondary"
            >
              Pridať {this.props.activeProject.data().meta.versionsCount + 1}. verziu
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

NewVersionConfirmDialog.propTypes = {
  open: propTypes.bool.isRequired,
  onClick: propTypes.func.isRequired,
  activeProject: propTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    addProjectVersion: () => dispatch(addProjectVersion()),
  }
};

export default connect(null, mapDispatchToProps)(NewVersionConfirmDialog);