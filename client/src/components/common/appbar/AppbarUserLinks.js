import './Appbar.scss';

import { Divider, IconButton, Menu } from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuItem from './AppbarMenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import { connect } from 'react-redux';
import { logout } from '../../../store/actions/authActions';
import propTypes from 'prop-types';

class UserLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    }
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  }

  render() {
    return (
      <div>
        <IconButton onClick={this.handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}>
          <MenuItem 
            disabled
            icon={<AccountCircleIcon />}
            text={this.props.userEmail ? this.props.userEmail : "Odhlasujem.."}
          />
          <Divider />
          <MenuItem
            icon={<SettingsIcon />}
            text="Nastavenia účtu"
            onClick={this.handleClose}
          />
          <MenuItem
            icon={<RemoveCircleIcon />}
            text="Odhlásiť"
            onClick={this.props.logout}
          />
        </Menu>
      </div>
    );
  }
}

UserLinks.propTypes = {
  logout: propTypes.func.isRequired,
  userEmail: propTypes.string
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

const mapStateToProps = state => {
  return {
    userEmail: state.firebase.auth.email
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLinks);