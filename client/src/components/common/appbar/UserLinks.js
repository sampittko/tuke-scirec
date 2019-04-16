import './index.scss';
import {Divider, IconButton, Menu} from '@material-ui/core';
import AccountIcon from 'mdi-material-ui/Account';
import MenuItem from './MenuItem';
import DotsVerticalIcon from 'mdi-material-ui/DotsVertical';
import React from 'react';
import AccountArrowLeft from 'mdi-material-ui/AccountArrowLeft';
import {connect} from 'react-redux';
import {logout} from '../../../store/actions/authActions';
import propTypes from 'prop-types';

class UserLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    return (
      <div>
        <IconButton onClick={this.handleClick}>
          <DotsVerticalIcon/>
        </IconButton>
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}>
          <MenuItem
            disabled
            icon={<AccountIcon/>}
            text={this.props.userEmail ? this.props.userEmail : "Odhlasujem.."}
          />
          <Divider/>
          <MenuItem
            icon={<AccountArrowLeft/>}
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
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
};

const mapStateToProps = state => {
  return {
    userEmail: state.firebase.auth.email
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLinks);