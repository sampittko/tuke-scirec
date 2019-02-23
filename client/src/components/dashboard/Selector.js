import React from 'react';
import propTypes from 'prop-types';
import userPropTypes from '../../propTypes/userPropTypes';
import dashboardPropTypes from '../../propTypes/dashboardPropTypes';
import { getDashboards } from '../../store/actions/dashboardActions';
import { dashboard } from '../../config/app';
import { connect } from 'react-redux';
import { createDashboard } from '../../store/actions/dashboardActions';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import NewDashboardDialog from './NewDashboardDialog';
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
        {this.props.dashboards && !this.props.isLoading && (
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
                    value={dashboard.MAX_COUNT}
                    disabled={this.props.dashboards.length === dashboard.MAX_COUNT}
                  >
                    Nová nástenka
                  </MenuItem>
                </Select>
              </FormControl>
            <NewDashboardDialog
              open={this.state.selectedDashboard === dashboard.MAX_COUNT}
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
  getDashboards: propTypes.func.isRequired,
  user: userPropTypes.user.isRequired,
  dashboards: propTypes.array,
  isLoading: propTypes.bool.isRequired
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
    isLoading: state.dashboard.isLoading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Selector);