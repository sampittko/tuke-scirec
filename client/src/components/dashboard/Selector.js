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
      selectedDashboard: 0
    }
  }

  componentDidMount() {
    this.props.getDashboards(this.props.user.id);
  }

  handleClick = () => {
    this.setState({
      selectedDashboard: 0
    });
  }

  handleChange = event => {
    this.setState({
      selectedDashboard: event.target.value
    });
  }

  createDashboard = newDashboard => {
    this.handleClick();
    this.props.createDashboard(newDashboard);
    this.props.getDashboards(this.props.user.id);
  }

  render() {
    return (
      <div>
        {this.props.dashboards && !this.props.isDashboardLoading && (
          <div className="selector">
              <FormControl>
                <Select
                  disableUnderline
                  value={this.state.selectedDashboard}
                  onChange={this.handleChange}
                >
                  {this.props.dashboards.map((dashboard, i) =>
                    <MenuItem key={i} value={i}>
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
              open={this.state.selectedDashboard === dashboardConfig.MAX_COUNT}
              createDashboard={newDashboard => this.createDashboard(newDashboard)}
              onClick={this.handleClick}
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
  isDashboardLoading: propTypes.bool.isRequired
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
    dashboards: state.dashboard.data.dashboards,
    isDashboardLoading: state.dashboard.isLoading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Selector);