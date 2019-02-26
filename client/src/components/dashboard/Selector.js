import React from 'react';
import propTypes from 'prop-types';
import userPropTypes from '../../propTypes/userPropTypes';
import { getDashboards } from '../../store/actions/dashboardActions';
import { dashboardConfig } from '../../config/app';
import { connect } from 'react-redux';
import { createDashboard, changeDashboard } from '../../store/actions/dashboardActions';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import NewDashboardDialog from './dialog/NewDashboardDialog';
import './Selector.scss';

class Selector extends React.Component {
  componentDidMount() {
    this.props.getDashboards(this.props.user.id);
  }

  handleClick = (event, newDashboard) => {
    if (newDashboard) {
      this.props.changeDashboard();
      this.props.createDashboard(newDashboard);
    }
    else {
      this.props.changeDashboard();
    }
  }

  handleChange = event => {
    this.props.changeDashboard(event.target.value);
  }

  render() {
    return (
      <div>
        {this.props.dashboards && !this.props.isDashboardLoading && (
          <div className="selector">
            <FormControl>
              <Select
                disableUnderline
                value={this.props.activeDashboardId}
                onChange={this.handleChange}
              >
                {this.props.dashboards.map((dashboard, i) =>
                  <MenuItem
                    key={i}
                    value={dashboard.created}
                  >
                    {dashboard.name}
                  </MenuItem>
                )}
                <MenuItem 
                  value={dashboardConfig.MAX_COUNT}
                  disabled={this.props.dashboards.length === dashboardConfig.MAX_COUNT}
                >
                  Nová nástenka
                </MenuItem>
              </Select>
            </FormControl>
            <NewDashboardDialog
              open={this.props.activeDashboardId === dashboardConfig.MAX_COUNT}
              onClick={(event, newDashboard) => this.handleClick(event, newDashboard)}
            />
          </div>
        )}
      </div>
    )
  }
}

Selector.propTypes = {
  createDashboard: propTypes.func.isRequired,
  getDashboards: propTypes.func.isRequired,
  user: userPropTypes.user.isRequired,
  dashboards: propTypes.array,
  defaultDashboard: propTypes.object,
  isDashboardLoading: propTypes.bool.isRequired,
  activeDashboardId: propTypes.number,
}

const mapDispatchToProps = dispatch => {
  return {
    createDashboard: newDashboard => dispatch(createDashboard(newDashboard)),
    getDashboards: userId => dispatch(getDashboards(userId)),
    changeDashboard: newActive => dispatch(changeDashboard(newActive))
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data,
    dashboards: state.dashboard.data.list,
    isDashboardLoading: state.dashboard.isLoading,
    defaultDashboard: state.dashboard.data.default,
    activeDashboardId: state.dashboard.selector.activeId,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Selector);