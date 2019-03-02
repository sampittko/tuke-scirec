import './Sidebar.scss';

import { IconButton, List, SwipeableDrawer } from '@material-ui/core';

import Links from './Links';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import UserLinks from './UserLinks';
import propTypes from 'prop-types';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false,
    };
  }

  handleDrawerToggle = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    return (
      <div>
        <IconButton className="menu-button" color="inherit" aria-label="Menu" onClick={this.handleDrawerToggle('left', true)}>
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.handleDrawerToggle('left', false)}
          onOpen={this.handleDrawerToggle('left', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.handleDrawerToggle('left', false)}
          >
            <List className="sidebar-links">
              {this.props.isAuth ? (
                <UserLinks location={this.props.location} />
              ) : (
                <Links location={this.props.location} />
              )}
            </List>
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

Sidebar.propTypes = {
  isAuth: propTypes.bool.isRequired,
  location: propTypes.object.isRequired
}

export default Sidebar;