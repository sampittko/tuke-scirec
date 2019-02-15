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

const AppbarComponent = props =>
  <AppBar position="static">
    <Toolbar className={props.isAuth ? "user-toolbar" : ""}>
      <Sidebar isAuth={props.isAuth} location={props.location} />
      <Typography variant="h6" color="inherit" className="brand">
        <Link className="link" to={routes.home}>
          SCIREC
        </Link>
      </Typography>
      {props.isAuth ? (
        <UserLinks
          logout={props.logout}
          user={props.user}
        />
      ) : (
        <Links location={props.location} />
      )}
    </Toolbar>
    {props.isAuth && props.location.pathname === routes.home ? (
      <Toolbar>
        <CategoryHandler />
      </Toolbar>
    ) : (
      ""
    )}
  </AppBar>;

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