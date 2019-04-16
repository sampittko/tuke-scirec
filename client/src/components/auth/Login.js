import './Login.scss';
import {Button, Fade, Paper, TextField, Typography} from '@material-ui/core';
import FacebookIcon from 'mdi-material-ui/Facebook';
import TwitterIcon from 'mdi-material-ui/Twitter';
import GithubIcon from 'mdi-material-ui/GithubFace';
import GoogleIcon from 'mdi-material-ui/Google';
import Notification from '../common/Notification';
import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {getDocumentTitleFromComponent} from '../../utils/appConfigUtils';
import {passwordLogin, providerLogin, resetAuthState} from '../../store/actions/authActions';
import logo from '../../static/media/logo.png';
import propTypes from 'prop-types';
import routes from '../../config/app/routes';
import {timeouts} from '../../config/mui';
import {userConfig} from "../../config/app";
import LostPasswordDialog from "./ResetPasswordDialog";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'sampittko@gmail.com',
      password: 'testtest',
      notify: false,
      open: false,
    };
  }

  componentDidMount() {
    document.title = getDocumentTitleFromComponent(this);
    if (this.props.error) {
      this.props.resetAuthState();
    }
  }

  handleForgottenPassword = () => {
    if (this.props.error) {
      this.props.resetAuthState();
    }
    this.setState((prevState) => ({
      open: !prevState.open,
    }))
  };

  handleForgottenPasswordSubmit = () => {
    this.handleForgottenPassword();
    this.setState({
      notify: true,
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.passwordLogin(this.state);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClose = () => {
    this.setState({
      notify: false,
    })
  };

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
              value={this.state.email}
              autoFocus
              required
            />
            <TextField
              label="Heslo"
              type="password"
              name="password"
              margin="normal"
              variant="outlined"
              autoComplete="current-password"
              helperText={this.props.error ? "Prihlásenie nebolo úspešné" : ""}
              error={this.props.error}
              onChange={this.handleChange}
              value={this.state.password}
              required
            />
            <div className="action-buttons">
              <Button
                disabled={this.props.isAuthLoading}
                onClick={this.handleForgottenPassword}
              >
                Zabudnuté heslo
              </Button>
              <Button
                disabled={this.props.isAuthLoading}
                type="submit"
                variant="contained"
                color="secondary"
              >
                Prihlásiť
              </Button>
            </div>
            <div className="socials-login-buttons">
              <Button
                className="google"
                size="small"
                variant="outlined"
                onClick={() => this.props.providerLogin(userConfig.authProviders.GOOGLE)}
              >
                <GoogleIcon className="icon" fontSize="small"/>
                Google prihlásenie
              </Button>
              <Button
                className="facebook"
                size="small"
                variant="outlined"
                onClick={() => this.props.providerLogin(userConfig.authProviders.FACEBOOK)}
              >
                <FacebookIcon className="icon"/>
                Facebook prihlásenie
              </Button>
              <Button
                className="twitter"
                size="small"
                variant="outlined"
                onClick={() => this.props.providerLogin(userConfig.authProviders.TWITTER)}
              >
                <TwitterIcon className="icon"/>
                Twitter prihlásenie
              </Button>
              <Button
                className="github"
                size="small"
                variant="outlined"
                onClick={() => this.props.providerLogin(userConfig.authProviders.GITHUB)}
              >
                <GithubIcon className="icon"/>
                GitHub prihlásenie
              </Button>
            </div>
          </form>
          {this.props.location.state && this.props.location.state.registered && (
            <Notification
              message="Účet bol úspešne vytvorený"
              onClose={this.handleClose}
            />
          )}
          {this.state.notify && (
            <Notification
              message="E-mail pre obnovenie hesla bol odoslaný"
              onClose={this.handleClose}
            />
          )}
          <LostPasswordDialog
            open={this.state.open}
            onClick={this.handleForgottenPassword}
            onSent={this.handleForgottenPasswordSubmit}
          />
        </Paper>
      </Fade>
    ) : (
      <Redirect
        to={this.props.location.state && this.props.location.state.from ? this.props.location.state.from : routes.HOME}/>
    )
  }
}

Login.propTypes = {
  resetAuthState: propTypes.func.isRequired,
  passwordLogin: propTypes.func.isRequired,
  providerLogin: propTypes.func.isRequired,
  isAuth: propTypes.bool.isRequired,
  isAuthLoading: propTypes.bool.isRequired,
  location: propTypes.object.isRequired,
  error: propTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    passwordLogin: user => dispatch(passwordLogin(user)),
    providerLogin: authProvider => dispatch(providerLogin(authProvider)),
    resetAuthState: () => dispatch(resetAuthState()),
  }
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.success,
    isAuthLoading: state.auth.isLoading,
    error: !!state.auth.error
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);