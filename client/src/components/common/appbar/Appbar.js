import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import userPropTypes from '../../../propTypes/userPropTypes';
import routes from '../../../routes';
import { withRouter } from 'react-router';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Sidebar from '../sidebar/Sidebar';
import Links from './Links';
import UserLinks from './UserLinks';
import CategoryHandler from '../../dashboard/CategoryHandler';
import { Link } from 'react-router-dom';
import { logout } from '../../../store/actions/userActions';
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
            <UserLinks
              logout={this.props.logout}
              user={this.props.user}
            />
          ) : (
            <Links location={this.props.location} />
          )}
        </Toolbar>
        {this.props.isAuth && this.props.location.pathname === routes.home ? (
          <Toolbar>
            <CategoryHandler />
          </Toolbar>
        ) : (
          ""
        )}
      </AppBar>
    );
  }
}

AppbarComponent.propTypes = {
  logout: propTypes.func.isRequired,
  isAuth: propTypes.bool.isRequired,
  location: propTypes.object.isRequired,
  user: userPropTypes.user
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.user.data !== null,
    user: state.user.data
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppbarComponent));