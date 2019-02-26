import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Checkbox, Typography, Button, TextField, Paper, Fade } from '@material-ui/core';
import routes from '../../config/app/routes';
import { register } from '../../store/actions/authActions';
import { firebaseErrorCodes } from '../../config/firebase/errorCodes';
import logo from '../../static/media/logo.png';
import { timeouts } from '../../config/app/ui';
import { getDocumentTitle } from '../../config/app/titles';
import './Register.scss';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      verifiedPassword: '',
    }
  }

  formSubmitted = false;

  componentDidMount() {
    document.title = getDocumentTitle(this);
  }

  errorCodesMatches(errorCode) {
    return errorCode === this.props.errorCode;
  }

  sufficientPassword() {
    return this.state.password.length >= 6;
  }

  matchingPasswords() {
    return this.state.password === this.state.verifiedPassword;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.register({
      email: this.state.email,
      password: this.state.password
    });
    this.formSubmitted = true;
  }

  handleChange = (e) => {
    this.setState({ 
      [e.target.name]: e.target.value
    });
  }

  render() {
    return !this.props.isAuth ? (
      <Fade in timeout={timeouts.FADE_IN}>
        <Paper className="register">
          <div className="header">
            <img src={logo} alt="SCIREC logo" />
            <Typography variant="h5">
              Registrácia
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
              onChange={this.handleChange}
              error={this.errorCodesMatches(firebaseErrorCodes.auth.EMAIL_ALREADY_IN_USE)}
              helperText={this.errorCodesMatches(firebaseErrorCodes.auth.EMAIL_ALREADY_IN_USE) ? "E-mail sa už používa" : ""}
              required
            />
            <TextField
              label="Heslo"
              type="password"
              name="password"
              margin="normal"
              variant="outlined"
              autoComplete="new-password"
              onChange={this.handleChange}
              required
            />
            <TextField
              label="Heslo"
              type="password"
              name="verifiedPassword"
              margin="normal"
              variant="outlined"
              autoComplete="new-password"
              onChange={this.handleChange}
              helperText={!this.sufficientPassword() ? "Heslo musí mať aspoň 6 znakov" : (!this.matchingPasswords() ? "Heslá sa nezhodujú" : "")}
              required
            />
            <div>
              <Checkbox color="primary" required />
              <Typography component="div">
                Súhlasim s&nbsp;
                <Link
                  target="_blank"
                  rel="noopener"
                  to={routes.home}
                >
                  podmienkami pre používateľa SCIREC
                </Link>
              </Typography>
            </div>
            <div>
              <Checkbox color="primary" required />
              <Typography component="div">
                Súhlasim so&nbsp;
                <Link 
                  target="_blank"
                  rel="noopener" 
                  to={routes.home}
                >
                  spracovaním poskytnutých údajov
                </Link>
              </Typography>
            </div>
            <div className="action-buttons">
              <Button 
                type="submit"
                variant="contained"
                color="primary"
                disabled={!this.matchingPasswords() || this.props.isUserLoading}
              >
                Registrovať
              </Button>
            </div>
            {(this.formSubmitted && this.props.errorCode === '' && !this.props.isUserLoading) && (
              <Redirect
                to={{
                  pathname: routes.auth.login,
                  state: {
                    registered: true
                  }
                }}
              />
            )}
          </form>
        </Paper>
      </Fade>
    ) : (
        <Redirect to={routes.dashboard} />
    )
  }
}

Register.propTypes = {
  register: propTypes.func.isRequired,
  isAuth: propTypes.bool.isRequired,
  isUserLoading: propTypes.bool.isRequired,
  errorCode: propTypes.string.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    register: newUser => dispatch(register(newUser))
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.success,
    isUserLoading: state.auth.isLoading,
    errorCode: state.auth.error ? state.auth.error.code : ''
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);