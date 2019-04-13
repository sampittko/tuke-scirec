import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@material-ui/core';

import DialogTransition from '../../common/DialogTransition';
import React from 'react';
import {connect} from 'react-redux';
import {deleteProject} from '../../../store/actions/projectActions';
import propTypes from 'prop-types';
import {getDashboardRoute} from "../../../utils/dashboardUtils";

class DeleteConfirmDialog extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.onClick();
    await this.props.deleteProject();
    this.props.history.push(getDashboardRoute(this.props.activeDashboard.data().route));
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        TransitionComponent={DialogTransition}
      >
        <form onSubmit={this.handleSubmit}>
          <DialogTitle>Vymazanie projektu</DialogTitle>
          <DialogContent>
            <Typography>
              Naozaj si prajete vykonať túto akciu? <span className="text-bolder">Akcia je nenávratná!</span>
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
              Vymazať projekt
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

DeleteConfirmDialog.propTypes = {
  open: propTypes.bool.isRequired,
  isProjectLoading: propTypes.bool.isRequired,
  deleteProject: propTypes.func.isRequired,
  onClick: propTypes.func.isRequired,
  history: propTypes.object.isRequired,
  activeDashboard: propTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProject: async () => dispatch(deleteProject()),
  }
};

const mapStateToProps = state => {
  return {
    isProjectLoading: state.project.isLoading,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteConfirmDialog);