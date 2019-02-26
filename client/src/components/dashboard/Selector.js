import React from 'react';
import propTypes from 'prop-types';
import dashboardPropTypes from '../../propTypes/dashboardPropTypes';
import { getDashboards } from '../../store/actions/dashboardActions';
import { dashboardConfig } from '../../config/app';
import { connect } from 'react-redux';
import { createDashboard, changeDashboard } from '../../store/actions/dashboardActions';
import { FormControl, Select, MenuItem, Divider } from '@material-ui/core';
import NewDashboardDialog from './dialog/NewDashboardDialog';
import './Selector.scss';

class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    this.props.getDashboards(this.props.userId);
  }

  handleClick = (event, newDashboard) => {
    this.props.changeDashboard();
    if (newDashboard) {
      this.props.createDashboard({
        ...newDashboard,
        name: this.state.name
      });
      this.setState({
        name: ''
      });
    }
  }

  handleNameChange = event => {
    if (this.state.name.length !== dashboardConfig.MAX_LENGTH || event.target.value.length < dashboardConfig.MAX_LENGTH) {
      this.setState({
        name: event.target.value
      });
    }
  }

  handleSelectChange = event => {
    if (this.props.activeDashboardId !== event.target.value) {
      this.props.changeDashboard(event.target.value);
    }
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
                onChange={this.handleSelectChange}
              >
                {this.props.dashboards.map((dashboard, i) =>
                  <MenuItem
                    key={i}
                    value={dashboard.created}
                  >
                    {dashboard.name}
                  </MenuItem>
                )}
                <Divider />
                <MenuItem 
                  value={dashboardConfig.MAX_COUNT}
                  disabled={this.props.dashboards.length === dashboardConfig.MAX_COUNT}
                >
                  {this.state.name.length !== 0 && this.props.activeDashboardId === dashboardConfig.MAX_COUNT ? this.state.name : "Nová nástenka"}
                </MenuItem>
              </Select>
            </FormControl>
            <NewDashboardDialog
              name={this.state.name}
              open={this.props.activeDashboardId === dashboardConfig.MAX_COUNT}
              onClick={(event, newDashboard) => this.handleClick(event, newDashboard)}
              handleNameChange={this.handleNameChange}
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
  dashboards: propTypes.array,
  defaultDashboard: dashboardPropTypes.dashboard,
  isDashboardLoading: propTypes.bool.isRequired,
  activeDashboardId: propTypes.number
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
    userId: state.firebase.auth.uid,
    dashboards: state.dashboard.data.list,
    isDashboardLoading: state.dashboard.isLoading,
    defaultDashboard: state.dashboard.data.default,
    activeDashboardId: state.dashboard.selector.activeId,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Selector);