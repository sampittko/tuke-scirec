import React from 'react';
import { Redirect } from 'react-router';
import { Typography } from '@material-ui/core';
import authPropTypes from '../propTypes/authPropTypes';
import { connect } from 'react-redux';
import dashboardPropTypes from '../propTypes/dashboardPropTypes';
import { getDashboardRoute } from '../utils/dashboardUtils';
import propTypes from 'prop-types';

class Home extends React.Component {
  render() {
    return (
      <div>
        {this.props.dashboards ? (
          <Redirect to={getDashboardRoute(this.props.activeDashboardRoute)} />
        ) : (
          <Typography>Vitajte</Typography>
        )}
      </div>
    )
  }
}

Home.propTypes = {
  isAuth: authPropTypes.success.isRequired,
  dashboards: propTypes.arrayOf(dashboardPropTypes.dashboard),
  activeDashboardRoute: propTypes.string,
  isDashboardLoading: propTypes.bool.isRequired,
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.success,
    activeDashboardRoute: state.dashboard.selector.activeRoute || "",
    dashboards: state.dashboard.data.list,
    isDashboardLoading: state.dashboard.isLoading
  }
}

export default connect(mapStateToProps)(Home);