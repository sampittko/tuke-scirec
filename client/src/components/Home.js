import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Typography } from '@material-ui/core';
import dashboardPropTypes from '../propTypes/dashboardPropTypes';
import routes from '../config/app/routes';

class Home extends React.Component {
  render() {
    return (
      <div>
        {this.props.dashboards ? (
          <Redirect to={`${routes.DASHBOARDS}/${this.props.activeDashboardRoute}`} />
        ) : (
          <Typography>Vitajte</Typography>
        )}
      </div>
    )
  }
}

Home.propTypes = {
  isAuth: propTypes.bool.isRequired,
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