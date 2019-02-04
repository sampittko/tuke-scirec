import React from 'react';
import { SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import './SideBar.scss';

class SideBar extends React.Component {
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
            <div className="list">
              <List>
                <ListItem button>
                  <ListItemIcon><HomeIcon /></ListItemIcon>
                  <ListItemText>
                    <Link className="link" to="/">Domov</Link>
                  </ListItemText>
                </ListItem>
              </List>
            </div>
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

export default SideBar;