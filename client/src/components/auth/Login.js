import './Login.scss';

import { Button, Fade, Paper, TextField, Typography } from '@material-ui/core';

import Notification from '../common/Notification';
import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { getDocumentTitle } from '../../utils/appConfigUtils';
import { login } from '../../store/actions/authActions';
import logo from '../../static/media/logo.png';
import propTypes from 'prop-types';
import routes from '../../config/app/routes';
import { timeouts } from '../../config/mui';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    document.title = getDocumentTitle(this._reactInternalFiber.elementType.name);
  }

  handleForgottenPassword = () => {
    
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  render() {
    return !this.props.isAuth ? (
      <Fade in timeout={timeouts.FADE_IN}>
        <Paper className="login">
          <div className="header">
            <img
              src={logo}
              alt="SCIREC logo"
            />
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
              autoComplete="email"
              error={this.props.error}
              onChange={this.handleChange}
              required
            />
            <TextField
              label="Heslo"
              type="password"
              name="password"
              margin="normal"
              variant="outlined"
              autoComplete="current-password"
              helperText={this.props.error ? "Nesprávne prihlasovacie údaje" : ""}
              error={this.props.error}
              onChange={this.handleChange}
              required
            />
            <div className="action-buttons">
              <Button
                disabled={this.props.isUserLoading}
                onClick={this.handleForgottenPassword}
              >
                Zabudnuté heslo
              </Button>
              <Button
                disabled={this.props.isUserLoading}
                type="submit"
                variant="contained"
                color="primary"
              >
                Prihlásiť
              </Button>
            </div>
          </form>
          {this.props.location.state && this.props.location.state.registered && (
            <Notification message="Účet bol úspešne vytvorený" />
          )}
        </Paper>
      </Fade>
    ) : (
      <Redirect to={routes.HOME} />
    )
  }
}

Login.propTypes = {
  login: propTypes.func.isRequired,
  isAuth: propTypes.bool.isRequired,
  isUserLoading: propTypes.bool.isRequired,
  location: propTypes.object.isRequired,
  error: propTypes.bool.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(login(user))
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.success,
    isUserLoading: state.auth.isLoading,
    error: state.auth.error ? true : false
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);