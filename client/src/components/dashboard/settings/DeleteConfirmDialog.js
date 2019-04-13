import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@material-ui/core';

import DialogTransition from '../../common/DialogTransition';
import NewDefaultDashboardSelectMenu from './NewDefaultDashboardSelectMenu';
import React from 'react';
import {connect} from 'react-redux';
import {deleteDashboard} from '../../../store/actions/dashboardActions';
import propTypes from 'prop-types';
import {getDashboardRoute} from "../../../utils/dashboardUtils";

class DeleteConfirmDialog extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.onClick();
    await this.props.deleteDashboard(this.props.newDefaultDashboardId);
    this.props.history.push(getDashboardRoute(this.props.activeDashboard.data().route));
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        TransitionComponent={DialogTransition}
      >
        <form onSubmit={this.handleSubmit}>
          <DialogTitle>Vymazanie nástenky</DialogTitle>
          <DialogContent>
            <Typography>
              Naozaj si prajete vykonať túto akciu? <span className="text-bolder">Akcia je nenávratná!</span>
            </Typography>
            {this.props.isDefault && (
              <div>
                <Typography>
                  Najskôr musíte zvoliť novú predvolenú nástenku:
                </Typography>
                <NewDefaultDashboardSelectMenu
                  value={this.props.newDefaultDashboardId}
                  onChange={this.props.onChange}
                  dashboards={this.props.dashboards}
                  activeDashboard={this.props.activeDashboard}
                />
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.props.onClick}
              disabled={this.props.isDashboardLoading}
              type="button"
            >
              Zrušiť
            </Button>
            <Button
              type="submit"
              disabled={this.props.newDefaultDashboardId === "" && this.props.isDefault}
              color="secondary"
            >
              Vymazať {this.props.activeDashboard.data().title}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

DeleteConfirmDialog.propTypes = {
  open: propTypes.bool.isRequired,
  isDefault: propTypes.bool.isRequired,
  newDefaultDashboardId: propTypes.string.isRequired,
  activeDashboard: propTypes.any.isRequired,
  dashboards: propTypes.arrayOf(propTypes.object).isRequired,
  isDashboardLoading: propTypes.bool.isRequired,
  deleteDashboard: propTypes.func.isRequired,
  onClick: propTypes.func.isRequired,
  onChange: propTypes.func.isRequired,
  history: propTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    deleteDashboard: async (newDefaultDashboardId) => dispatch(deleteDashboard(newDefaultDashboardId)),
  }
};

const mapStateToProps = state => {
  return {
    dashboards: state.dashboard.data.list,
    activeDashboard: state.dashboard.selector.active,
    isDashboardLoading: state.dashboard.isLoading,
    isDefault: state.dashboard.selector.activeId === state.dashboard.data.default.id,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteConfirmDialog);