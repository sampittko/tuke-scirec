import React from 'react';
import propTypes from 'prop-types';
import { Typography, Button, TextField, Paper, Fade } from '@material-ui/core';
import { login } from '../../store/actions/userActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import routes from '../../config/app/routes';
import logo from './../../static/media/logo.png';
import Notification from '../common/Notification';
import { timeouts } from '../../config/app/ui';
import { getDocumentTitle } from '../../config/app/titles';
import './Login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    document.title = getDocumentTitle(this);
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
                disabled={this.props.isLoading}
                onClick={this.handleForgottenPassword}
              >
                Zabudnuté heslo
              </Button>
              <Button
                disabled={this.props.isLoading}
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
      <Redirect to={routes.dashboard} />
    )
  }
}

Login.propTypes = {
  login: propTypes.func.isRequired,
  isAuth: propTypes.bool.isRequired,
  isLoading: propTypes.bool.isRequired,
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
    isAuth: state.user.data !== null,
    isLoading: state.user.isLoading,
    error: state.user.error ? true : false
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);