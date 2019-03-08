import React from 'react';
import { Redirect } from 'react-router';
import { Typography } from '@material-ui/core';
import authPropTypes from '../propTypes/authPropTypes';
import { connect } from 'react-redux';
import dashboardPropTypes from '../propTypes/dashboardPropTypes';
import { getDashboardRoute } from '../utils/dashboardUtils';
import { getDocumentTitleFromComponent } from '../utils/appConfigUtils';
import propTypes from 'prop-types';

class Home extends React.Component {
  componentDidMount() {
    document.title = getDocumentTitleFromComponent(this);
  }

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
  dashboards: propTypes.array,
  activeDashboardRoute: propTypes.string,
  isDashboardLoading: dashboardPropTypes.isLoading.isRequired,
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