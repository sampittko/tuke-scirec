import './Selector.scss';

import {Divider, FormControl, MenuItem, Select} from '@material-ui/core';
import {changeDashboard, createDashboard} from '../../store/actions/dashboardActions';

import NewDashboardDialog from './NewDialog';
import React from 'react';
import {connect} from 'react-redux';
import {dashboardConfig} from '../../config/app';
import {getDashboardRoute} from '../../utils/dashboardUtils';
import propTypes from 'prop-types';
import {getRouteFromString} from "../../utils/appConfigUtils";

class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
  }

  handleClick = (event, newDashboard) => {
    this.props.changeDashboard();
    if (newDashboard) {
      this.props.createDashboard({
        ...newDashboard,
        title: this.state.title
      });
    }
    this.setState({
      title: ''
    });
  };

  handleTitleChange = event => {
    this.setState({
      title: event.target.value
    });
  };

  handleSelectChange = event => {
    if (this.props.activeDashboard.id !== event.target.value) {
      this.props.changeDashboard(event.target.value);
      event.target.value !== dashboardConfig.MAX_COUNT && this.props.history.push(getDashboardRoute(getRouteFromString(this.props.activeDashboard.data().title)));
    }
  };

  render() {
    return (
      <div>
        {this.props.dashboards && !this.props.isDashboardLoading && (
          <div className="dashboard-selector">
            <FormControl>
              <Select
                disableUnderline
                value={this.props.activeDashboard === dashboardConfig.MAX_COUNT ?
                  this.props.activeDashboard : this.props.activeDashboard.id}
                onChange={this.handleSelectChange}
              >
                {this.props.dashboards.map((dashboard, i) =>
                  <MenuItem
                    key={i}
                    value={dashboard.id}
                  >
                    {dashboard.data().title}
                  </MenuItem>
                )}
                <Divider/>
                <MenuItem
                  value={dashboardConfig.MAX_COUNT}
                  disabled={this.props.dashboards.length === dashboardConfig.MAX_COUNT}
                >
                  {this.state.title.length !== 0 && this.props.activeDashboard === dashboardConfig.MAX_COUNT ?
                    this.state.title : "Nová nástenka"}
                </MenuItem>
              </Select>
            </FormControl>
            <NewDashboardDialog
              title={this.state.title}
              open={this.props.activeDashboard === dashboardConfig.MAX_COUNT}
              onClick={(event, newDashboard) => this.handleClick(event, newDashboard)}
              handleTitleChange={this.handleTitleChange}
            />
          </div>
        )}
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dashboards.length !== this.props.dashboards.length) {
      this.props.history.push(getDashboardRoute(getRouteFromString(this.props.activeDashboard.data().title)));
    }
  }
}

Selector.propTypes = {
  createDashboard: propTypes.func.isRequired,
  defaultDashboard: propTypes.object,
  isDashboardLoading: propTypes.bool.isRequired,
  dashboards: propTypes.arrayOf(propTypes.object),
  history: propTypes.object.isRequired,
  activeDashboard: propTypes.any
};

const mapDispatchToProps = dispatch => {
  return {
    createDashboard: newDashboard => dispatch(createDashboard(newDashboard)),
    changeDashboard: newActive => dispatch(changeDashboard(newActive))
  }
};

const mapStateToProps = state => {
  return {
    dashboards: state.dashboard.data.list,
    isDashboardLoading: state.dashboard.isLoading,
    defaultDashboard: state.dashboard.data.default,
    activeDashboard: state.dashboard.selector.active,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Selector);