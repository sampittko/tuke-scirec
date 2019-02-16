import React from 'react';
import propTypes from 'prop-types';
import userPropTypes from '../../../propTypes/userPropTypes';
import { logout } from '../../../store/actions/userActions';
import { connect } from 'react-redux';
import { IconButton, Menu, Divider } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import MenuItem from './MenuItem';
import './Appbar.scss';

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
            text={this.props.user.email}
          />
          <Divider />
          <MenuItem
            icon={<SettingsIcon />}
            text="Nastavenia učtu"
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
  user: userPropTypes.user.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLinks);