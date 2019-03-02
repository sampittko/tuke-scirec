import React from 'react';
import propTypes from 'prop-types';
import dashboardPropTypes from '../../propTypes/dashboardPropTypes';
import { dashboardConfig } from '../../config/app';
import { connect } from 'react-redux';
import { getDashboardFromId } from '../../utils/dashboardUtils';
import { createDashboard, changeDashboard } from '../../store/actions/dashboardActions';
import { FormControl, Select, MenuItem, Divider } from '@material-ui/core';
import NewDashboardDialog from './dialog/NewDashboardDialog';
import routes from '../../config/app/routes';
import './Selector.scss';

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
      this.setState({
        title: ''
      });
    }
  }

  handleTitleChange = event => {
    if (this.state.title.length !== dashboardConfig.MAX_LENGTH || event.target.value.length < dashboardConfig.MAX_LENGTH) {
      this.setState({
        title: event.target.value
      });
    }
  }

  handleSelectChange = event => {
    if (this.props.activeDashboardId !== event.target.value) {
      this.props.changeDashboard(event.target.value);
      event.target.value !== dashboardConfig.MAX_COUNT && this.props.history.push(`${routes.DASHBOARDS}/${getDashboardFromId(event.target.value, this.props.dashboards).route}`);
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
                    {dashboard.title}
                  </MenuItem>
                )}
                <Divider />
                <MenuItem 
                  value={dashboardConfig.MAX_COUNT}
                  disabled={this.props.dashboards.length === dashboardConfig.MAX_COUNT}
                >
                  {this.state.title.length !== 0 && this.props.activeDashboardId === dashboardConfig.MAX_COUNT ? this.state.title : "Nová nástenka"}
                </MenuItem>
              </Select>
            </FormControl>
            <NewDashboardDialog
              title={this.state.title}
              open={this.props.activeDashboardId === dashboardConfig.MAX_COUNT}
              onClick={(event, newDashboard) => this.handleClick(event, newDashboard)}
              handleTitleChange={this.handleTitleChange}
            />
          </div>
        )}
      </div>
    )
  }
}

Selector.propTypes = {
  createDashboard: propTypes.func.isRequired,
  defaultDashboard: dashboardPropTypes.dashboard,
  isDashboardLoading: propTypes.bool.isRequired,
  activeDashboardId: propTypes.number,
  dashboards: propTypes.arrayOf(dashboardPropTypes.dashboard)
}

const mapDispatchToProps = dispatch => {
  return {
    createDashboard: newDashboard => dispatch(createDashboard(newDashboard)),
    changeDashboard: newActive => dispatch(changeDashboard(newActive))
  }
}

const mapStateToProps = state => {
  return {
    dashboards: state.dashboard.data.list,
    isDashboardLoading: state.dashboard.isLoading,
    defaultDashboard: state.dashboard.data.default,
    activeDashboardId: state.dashboard.selector.activeId
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Selector);