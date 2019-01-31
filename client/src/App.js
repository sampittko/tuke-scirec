import React from 'react';
import { connect } from 'react-redux';
import routes from './routes';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { SCIREC_THEME } from './theme';
import { withTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Login from './components/user/Login';
import Register from './components/user/Register';
import AppBar from './components/common/AppBar';
import Dashboard from './components/category/Dashboard';
import './index.css';

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
      <PrivateRoute exact path={routes.home} component={Dashboard} isAuth={props.isAuth} />
      <Switch>
        <Route exact path={routes.register} component={Register} />
        <Route exact path={routes.login} component={Login} />
      </Switch>
    </MuiThemeProvider>
  </Router>;

const mapStateToProps = state => {
  return {
    isAuth: state.user !== null
  }
}

export default connect(mapStateToProps)(withTheme()(App));
