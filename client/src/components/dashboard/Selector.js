import React from 'react';
import propTypes from 'prop-types';
import userPropTypes from '../../propTypes/userPropTypes';
import { getDashboards } from '../../store/actions/dashboardActions';
import { dashboardConfig } from '../../config/app';
import { connect } from 'react-redux';
import { createDashboard } from '../../store/actions/dashboardActions';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import NewDashboardDialog from './dialog/NewDashboardDialog';
import './Selector.scss';

class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.defaultDashboard ? props.defaultDashboard.created.seconds : 0,
      previous: 0
    }
  }

  componentDidMount() {
    this.props.getDashboards(this.props.user.id);
  }

  handleClick = (event, newDashboard) => {
    if (newDashboard) {
      this.handleClick();
      this.props.createDashboard(newDashboard);
      this.props.getDashboards(this.props.user.id);
    }
    else {
      this.setState({
        selected: this.state.previous,
        previous: dashboardConfig.MAX_COUNT
      });
    }
  }

  handleChange = event => {
    this.setState({
      selected: event.target.value,
      previous: this.state.selected
    });
  }

  render() {
    return (
      <div>
        {this.props.dashboards && !this.props.isDashboardLoading && (
          <div className="selector">
            <FormControl>
              <Select
                disableUnderline
                value={this.state.selected}
                onChange={this.handleChange}
              >
                {this.props.dashboards.map((dashboard, i) =>
                  <MenuItem
                    key={i}
                    value={dashboard.created.seconds}
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
              open={this.state.selected === dashboardConfig.MAX_COUNT}
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
}

const mapDispatchToProps = dispatch => {
  return {
    createDashboard: newDashboard => dispatch(createDashboard(newDashboard)),
    getDashboards: userId => dispatch(getDashboards(userId))
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data,
    dashboards: state.dashboard.data.list,
    isDashboardLoading: state.dashboard.isLoading,
    defaultDashboard: state.dashboard.data.default,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Selector);