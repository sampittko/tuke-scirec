import React from 'react';
import './Register.scss';
import { Link } from 'react-router-dom';
import { Checkbox, Typography, Button, TextField, Paper } from '@material-ui/core';
import logo from './../../images/logo.png';

class Register extends React.Component {
  handleRegister = () => {

  }

  render() {
    return (
      <main>
        <Paper className="register">
          <div className="header">
            <img src={logo} alt="SCIREC logo" />
            <Typography variant="h5">
              Registrácia
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
              required
            />
            <TextField
              label="Heslo"
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Heslo"
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              required
            />
            <div>
              <Checkbox color="primary" required />
              <Typography component="div">
                Súhlasim s&nbsp;
                <Link target="_blank" rel="noopener" to="/">
                  podmienkami pre používateľa SCIREC
                </Link>
              </Typography>
            </div>
            <div>
              <Checkbox color="primary" required />
              <Typography component="div">
                Súhlasim so&nbsp;
                <Link target="_blank" rel="noopener" to="/">
                  spracovaním poskytnutých údajov
                </Link>
              </Typography>
            </div>
            <div className="action-buttons">
              <Button variant="contained" color="primary" onClick={this.handleRegister}>
                Registrovať
              </Button>
            </div>
          </form>
        </Paper>
      </main>
    );
  }
}

export default Register;