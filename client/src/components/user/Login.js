import React from 'react';
import './Login.scss';
import { Typography, Button, TextField, Paper } from '@material-ui/core';
import { login } from '../../actions/userActions';
import { connect } from 'react-redux';
import logo from './../../images/logo.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleForgottenPassword = () => {
    
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state);
  }

  handleChange = (e) => {
    this.setState({ [e.target.type]: e.target.value });
  }
  
  render() {
    return (
      <Paper className="login">
        <div className="header">
          <img src={logo} alt="SCIREC logo" />
          <Typography variant="h5">
            Prihlásenie
          </Typography>
        </div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            label="E-mail"
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}
          />
          <TextField
            label="Heslo"
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}
          />
          <div className="action-buttons">
            <Button type="submit" variant="contained" color="primary">
              Prihlásiť
            </Button>
            <Button onClick={this.handleForgottenPassword}>
              Zabudnuté heslo
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => dispatch(login(credentials))
  }
}

export default connect(null, mapDispatchToProps)(Login);