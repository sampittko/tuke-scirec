import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import routes from '../../../routes';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import SideBar from '../SideBar';
import Links from './Links';
import UserLinks from './UserLinks';
import { Link } from 'react-router-dom';
import './AppBar.scss';

class AppBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: props.isAuth,
      registerPage: false
    }
  }

  handleLinkClick = () => {
    this.setState((state) => {
      return { registerPage: !state.registerPage };
    });
  }

  handleBrandClick = () => {
    if (this.state.registerPage) {
      this.handleLinkClick();
    }
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <SideBar />
          <Typography variant="h6" color="inherit" className="brand">
            <Link onClick={this.handleBrandClick} className="link" to={routes.home}>
              SCIREC
            </Link>
          </Typography>
          {this.state.isAuth ? <UserLinks /> : <Links onClick={this.handleLinkClick} registerPage={this.state.registerPage} />}
        </Toolbar>
      </AppBar>
    );
  }
}

AppBarComponent.propTypes = {
  isAuth: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
  return {
    isAuth: state.user.isAuth
  }
}

export default connect(mapStateToProps)(AppBarComponent);