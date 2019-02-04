import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import SideBar from './SideBar';
import { Link } from 'react-router-dom';
import './AppBar.scss';

class AppBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerPage: false,
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

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <SideBar />
          <Typography variant="h6" color="inherit" className="brand">
            <Link onClick={this.onBrandClick} className="link" to="/">
              SCIREC
            </Link>
          </Typography>
          {!this.state.registerPage &&
            <Link className="link" to="/registracia">
              <Button onClick={this.onClick} color="inherit">
                Registrácia
              </Button>
            </Link>
          }
          {this.state.registerPage &&
            <Link className="link" to="/prihlasenie">
              <Button onClick={this.onClick} color="inherit">
                Prihlásenie
              </Button>
            </Link>
          }
        </Toolbar>
      </AppBar>
    );
  }
}

export default AppBarComponent;