import './index.scss';

import {AppBar, Toolbar, Typography} from '@material-ui/core';

import {APP_NAME} from '../../../config/app/';
import DashboardSelector from '../../dashboard/Selector';
import {Link} from 'react-router-dom';
import Links from './Links';
import React from 'react';
import Sidebar from '../sidebar';
import UserLinks from './UserLinks';
import {connect} from 'react-redux';
import {getDashboardRoute} from '../../../utils/dashboardUtils';
import propTypes from 'prop-types';
import routes from '../../../config/app/routes';
import {withRouter} from 'react-router';

class AppbarComponent extends React.Component {
  getBrandRoute = () =>
    this.props.isAuth && this.props.dashboards ? getDashboardRoute(this.props.activeDashboardRoute) : routes.HOME;

  handleClick = event => {
    if (this.props.isAuth) {
      event.preventDefault();
      this.props.history.push(getDashboardRoute(this.props.activeDashboardRoute));
    }
  };

  render() {
    return (
      <AppBar
        className="appbar"
        position="fixed"
      >
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
  isAuth: propTypes.bool.isRequired,
  location: propTypes.object.isRequired,
  history: propTypes.object.isRequired,
  activeDashboardRoute: propTypes.string,
  dashboards: propTypes.arrayOf(propTypes.object),
  isDashboardLoading: propTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.success,
    activeDashboardRoute: state.dashboard.selector.activeRoute || "",
    dashboards: state.dashboard.data.list,
    isDashboardLoading: state.dashboard.isLoading,
  }
};

export default withRouter(connect(mapStateToProps)(AppbarComponent));