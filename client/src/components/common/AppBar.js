import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import routes from './../../routes';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { logout } from '../../actions/userActions';
import SideBar from './SideBar';
import { Link } from 'react-router-dom';
import './AppBar.scss';

class AppBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: props.isAuth,
      user: props.user,
      registerPage: false
    }
  }

  onClick = () => {
    this.setState((state) => {
      return { registerPage: !state.registerPage };
    });
  }

  onBrandClick = () => {
    if (this.state.registerPage) {
      this.onClick();
    }
  }

  handleLogout = () => {
    this.props.logout();
  }

  render() {
    console.log(this.state);
    return (
      <AppBar position="static">
        <Toolbar>
          <SideBar />
          <Typography variant="h6" color="inherit" className="brand">
            <Link onClick={this.onBrandClick} className="link" to={routes.home}>
              SCIREC
            </Link>
          </Typography>
          {!this.state.isAuth && !this.state.registerPage &&
            <Link className="link" to={routes.register}>
              <Button onClick={this.onClick} color="inherit">
                Registrácia
              </Button>
            </Link>
          }
          {!this.state.isAuth && this.state.registerPage &&
            <Link className="link" to={routes.login}>
              <Button onClick={this.onClick} color="inherit">
                Prihlásenie
              </Button>
            </Link>
          }
          {this.state.isAuth &&
            <Link className="link" to={routes.login}>
              <Button onClick={this.handleLogout} color="inherit">
                Odhlásiť
              </Button>
            </Link>
          }
        </Toolbar>
      </AppBar>
    );
  }
}

AppBarComponent.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    isAuth: state.user !== {},
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBarComponent);