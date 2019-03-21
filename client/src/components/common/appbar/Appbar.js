import './Appbar.scss';

import {AppBar, Toolbar, Typography} from '@material-ui/core';

import {APP_NAME} from '../../../config/app/';
import DashboardSelector from '../../dashboard/DashboardSelector';
import {Link} from 'react-router-dom';
import Links from './AppbarLinks';
import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import UserLinks from './AppbarUserLinks';
import authPropTypes from '../../../propTypes/authPropTypes';
import {changeDashboardToDefault} from '../../../store/actions/dashboardActions';
import {connect} from 'react-redux';
import dashboardPropTypes from '../../../propTypes/dashboardPropTypes';
import {getDashboardRoute} from '../../../utils/dashboardUtils';
import propTypes from 'prop-types';
import routes from '../../../config/app/routes';
import {withRouter} from 'react-router';

class AppbarComponent extends React.Component {
  getBrandRoute = () =>
    this.props.isAuth && this.props.dashboards ? getDashboardRoute(this.props.defaultDashboardRoute) : routes.HOME;

  handleClick = event => {
    if (this.props.isAuth) {
      event.preventDefault();
      if (this.props.defaultDashboardRoute !== this.props.activeDashboardRoute) {
        this.props.changeDashboardToDefault();
      }
    }
  };

  render() {
    return (
      <AppBar position="fixed">
        <Toolbar className={this.props.isAuth ? "user-toolbar" : ""}>
          <Sidebar
            isAuth={this.props.isAuth}
            location={this.props.location}
            isDashboardLoading={this.props.isDashboardLoading}
          />
          <Typography
            variant="h6"
            color="inherit"
            className="brand"
          >
            <Link
              className="link"
              to={this.getBrandRoute()}
              onClick={this.handleClick}
            >
              {APP_NAME}
            </Link>
          </Typography>
          {this.props.isAuth ? (
            <UserLinks/>
          ) : (
            <Links location={this.props.location}/>
          )}
        </Toolbar>
        {this.props.dashboards && this.props.location.pathname === getDashboardRoute(this.props.activeDashboardRoute) && (
          <Toolbar>
            <DashboardSelector history={this.props.history}/>
          </Toolbar>
        )}
      </AppBar>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeDashboardRoute !== this.props.activeDashboardRoute) {
      this.props.history.push(getDashboardRoute(this.props.activeDashboardRoute));
    }
  }
}

AppbarComponent.propTypes = {
  isAuth: authPropTypes.success.isRequired,
  location: propTypes.object.isRequired,
  history: propTypes.object.isRequired,
  activeDashboardRoute: propTypes.string,
  dashboards: propTypes.arrayOf(propTypes.object),
  defaultDashboardRoute: propTypes.string,
  isDashboardLoading: dashboardPropTypes.isLoading.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    changeDashboardToDefault: () => dispatch(changeDashboardToDefault()),
  }
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.success,
    activeDashboardRoute: state.dashboard.selector.activeRoute || "",
    dashboards: state.dashboard.data.list,
    defaultDashboardRoute: state.dashboard.data.default ? state.dashboard.data.default.data().route : "",
    isDashboardLoading: state.dashboard.isLoading,
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppbarComponent));