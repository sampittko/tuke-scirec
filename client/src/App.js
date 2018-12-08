import React from 'react';
import { connect } from 'react-redux';
import routes from './routes';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { SCIREC_THEME } from './themes';
import { withTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
import Login from './components/Login';

const PrivateRoute = ({ component: Component, isAuth, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      isAuth
        ?
        <Component {...props} />
        : (
        <Redirect
          to={{
            pathname: routes.login,
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const App = (props) => 
  <Router basename={window.basename}>
    <MuiThemeProvider theme={SCIREC_THEME}>
      <AppBar />
      <PrivateRoute exact path={routes.home} component={Login} isAuth={props.isAuth} />
      <Route exact path={routes.login} component={Login} />
    </MuiThemeProvider>
  </Router>;

const mapStateToProps = state => {
  return {
    isAuth: state.user !== null
  }
}

export default connect(mapStateToProps)(withTheme()(App));
