import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import routes from '../../../routes';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Sidebar from '../Sidebar';
import Links from './Links';
import UserLinks from './UserLinks';
import { Link } from 'react-router-dom';
import './Appbar.scss';

class AppbarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerPage: false
    }
  }

  handleClick = () => {
    this.setState((state) => {
      return { registerPage: !state.registerPage };
    });
  }

  handleBrandClick = () => {
    if (this.state.registerPage) {
      this.handleClick();
    }
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Sidebar />
          <Typography variant="h6" color="inherit" className="brand">
            <Link onClick={this.handleBrandClick} className="link" to={routes.home}>
              SCIREC
            </Link>
          </Typography>
          {this.props.isAuth ? <UserLinks /> : <Links onClick={this.handleClick} registerPage={this.state.registerPage} />}
        </Toolbar>
      </AppBar>
    );
  }
}

AppbarComponent.propTypes = {
  isAuth: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
  return {
    isAuth: state.user.isAuth
  }
}

export default connect(mapStateToProps)(AppbarComponent);