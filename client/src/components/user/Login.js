import React from 'react';
import PropTypes from 'prop-types';
import './Login.scss';
import { Typography, Button, TextField, Paper, CircularProgress } from '@material-ui/core';
import { login } from '../../actions/userActions';
import { connect } from 'react-redux';
import logo from './../../images/logo.png';
import routes from '../../routes';
import Redirect from 'react-router/Redirect';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
    return !this.props.isAuth ? (
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
            margin="normal"
            variant="outlined"
            error={this.props.error}
            onChange={this.handleChange}
          />
          <TextField
            label="Heslo"
            type="password"
            margin="normal"
            variant="outlined"
            helperText={this.props.error ? "Nesprávne prihlasovacie údaje" : ""}
            error={this.props.error}
            onChange={this.handleChange}
          />
          <div className="action-buttons">
            <Button disabled={this.props.isLoading} type="submit" variant="contained" color="primary">
              {this.props.isLoading ? <CircularProgress color="primary" /> : "Prihlásiť"}
            </Button>
            <Button disabled={this.props.isLoading} onClick={this.handleForgottenPassword}>
              Zabudnuté heslo
            </Button>
          </div>
        </form>
      </Paper>
    ) : (
      <Redirect to={routes.home} />
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    login: (credentials) => dispatch(login(credentials))
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.user.isAuth,
    isLoading: state.user.isLoading,
    error: state.user.error ? true : false
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);