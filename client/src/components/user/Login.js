import React from 'react';
import './Login.scss';
import { Typography, Button, TextField, Paper } from '@material-ui/core';
import logo from './../../images/logo.png';

class Login extends React.Component {
  handleForgottenPassword = () => {

  }

  handleLogin = () => {

  }
  
  render() {
    return (
      <main>
        <Paper className="login">
          <div className="header">
            <img src={logo} alt="SCIREC logo" />
            <Typography variant="h5">
              Prihlásenie
            </Typography>
          </div>
          <form action="">
            <TextField
              label="E-mail"
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Heslo"
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
            />
            <div className="action-buttons">
              <Button variant="contained" color="primary" onClick={this.handleLogin}>
                Prihlásiť
              </Button>
              <Button onClick={this.handleForgottenPassword}>
                Zabudnuté heslo
              </Button>
            </div>
          </form>
        </Paper>
      </main>
    );
  }
}

export default Login;