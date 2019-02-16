import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import routes from '../../../routes';
import { withRouter } from 'react-router';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Sidebar from '../sidebar/Sidebar';
import Links from './Links';
import UserLinks from './UserLinks';
import CategoryHandler from '../../dashboard/CategoryHandler';
import { Link } from 'react-router-dom';
import './Appbar.scss';

class AppbarComponent extends React.Component {
  getBrandRoute() {
    if (this.props.location.pathname !== routes.user.login && this.props.location.pathname !== routes.user.register) {
      return routes.home;
    }
    return routes.user.login
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar className={this.props.isAuth ? "user-toolbar" : ""}>
          <Sidebar isAuth={this.props.isAuth} location={this.props.location} />
          <Typography variant="h6" color="inherit" className="brand">
            <Link className="link" to={this.getBrandRoute()}>
              SCIREC
            </Link>
          </Typography>
          {this.props.isAuth ? (
            <UserLinks />
          ) : (
            <Links location={this.props.location} />
          )}
        </Toolbar>
        {this.props.isAuth && this.props.location.pathname === routes.home && (
          <Toolbar>
            <CategoryHandler />
          </Toolbar>
        )}
      </AppBar>
    );
  }
}

AppbarComponent.propTypes = {
  isAuth: propTypes.bool.isRequired,
  location: propTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    isAuth: state.user.data !== null
  }
}

export default withRouter(connect(mapStateToProps)(AppbarComponent));