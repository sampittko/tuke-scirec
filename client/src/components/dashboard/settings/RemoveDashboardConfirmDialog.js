import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';

import NewDefaultDashboardSelectMenu from './NewDefaultDashboardSelectMenu';
import React from 'react';
import { connect } from 'react-redux';
import dashboardPropTypes from '../../../propTypes/dashboardPropTypes';
import { deleteDashboard } from '../../../store/actions/dashboardActions';
import propTypes from 'prop-types';

class RemoveDashboardConfirmDialog extends React.Component {
  handleClick = () => {
    this.props.deleteDashboard(this.props.newDefaultDashboardId);
    this.props.onClick();
  }

  render() {
    return (
      <Dialog open={this.props.open}>
        <DialogTitle>Vymazanie nástenky</DialogTitle>
        <DialogContent>
          <Typography>
            Naozaj si prajete vykonať túto akciu? Vymaže sa tým nástenka aj s projektami, ktoré sa v nej nachádzajú. Akcia je nenávratná!
                  </Typography>
          <NewDefaultDashboardSelectMenu
            value={this.props.newDefaultDashboardId}
            onChange={this.props.onChange}
            dashboards={this.props.dashboards}
            activeDashboard={this.props.activeDashboard}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.onClick}
            disabled={this.props.isDashboardLoading}
          >
            Zrušiť
          </Button>
          <Button
            onClick={this.handleClick}
            disabled={this.props.newDefaultDashboardId === "" || this.props.isDashboardLoading}
            color="secondary"
          >
            Potvrdiť
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

RemoveDashboardConfirmDialog.propTypes = {
  open: propTypes.bool.isRequired,
  newDefaultDashboardId: propTypes.string.isRequired,
  activeDashboard: propTypes.any.isRequired,
  dashboards: propTypes.arrayOf(propTypes.object).isRequired,
  isDashboardLoading: dashboardPropTypes.isLoading.isRequired,
  deleteDashboard: propTypes.func.isRequired,
  onClick: propTypes.func.isRequired,
  onChange: propTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => {
  return {
    deleteDashboard: newDefaultDashboardId => dispatch(deleteDashboard(newDefaultDashboardId)),
  }
}

const mapStateToProps = state => {
  return {
    dashboards: state.dashboard.data.list,
    activeDashboard: state.dashboard.selector.active,
    isDashboardLoading: state.dashboard.isLoading,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveDashboardConfirmDialog);