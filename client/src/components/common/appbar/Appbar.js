import './Appbar.scss';

import { AppBar, Toolbar, Typography } from '@material-ui/core';

import { APP_NAME } from '../../../config/app/';
import DashboardSelector from '../../dashboard/DashboardSelector';
import { Link } from 'react-router-dom';
import Links from './AppbarLinks';
import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import UserLinks from './AppbarUserLinks';
import authPropTypes from '../../../propTypes/authPropTypes';
import { connect } from 'react-redux';
import dashboardPropTypes from '../../../propTypes/dashboardPropTypes';
import { getDashboardRoute } from '../../../utils/dashboardUtils';
import propTypes from 'prop-types';
import routes from '../../../config/app/routes';

class AppbarComponent extends React.Component {
  getBrandRoute = () =>
    this.props.isAuth && this.props.dashboards ? getDashboardRoute(this.props.activeDashboardRoute) : routes.HOME;

  render() {
    return (
      <AppBar position="fixed">
        <Toolbar className={this.props.isAuth ? "user-toolbar" : ""}>
          <Sidebar 
            isAuth={this.props.isAuth}
            location={this.props.location}
          />
          <Typography
            variant="h6"
            color="inherit"
            className="brand"
          >
            <Link
              className="link"
              to={this.getBrandRoute()}
            >
              {APP_NAME}
            </Link>
          </Typography>
          {this.props.isAuth ? (
            <UserLinks />
          ) : (
            <Links location={this.props.location} />
          )}
        </Toolbar>
        {this.props.dashboards && this.props.location.pathname === getDashboardRoute(this.props.activeDashboardRoute) && (
          <Toolbar>
            <DashboardSelector history={this.props.history} />
          </Toolbar>
        )}
      </AppBar>
    );
  }
}

AppbarComponent.propTypes = {
  isAuth: authPropTypes.success.isRequired,
  location: propTypes.object.isRequired,
  history: propTypes.object.isRequired,
  activeDashboardRoute: propTypes.string,
  dashboards: propTypes.arrayOf(dashboardPropTypes.dashboard)
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.success,
    activeDashboardRoute: state.dashboard.selector.activeRoute || "",
    dashboards: state.dashboard.data.list
  }
}

export default connect(mapStateToProps)(AppbarComponent);