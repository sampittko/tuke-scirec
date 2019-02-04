import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import routes from './routes';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { SCIREC_THEME } from './theme';
import { withTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Dashboard from './components/user/Dashboard';
import Container from './components/common/Container';
import './index.scss';

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
      <Container isAuth={props.isAuth}>
        <PrivateRoute exact path={routes.home} component={Dashboard} />
        <Switch>
          <Route exact path={routes.register} component={Register} />
          <Route exact path={routes.login} component={Login} />
        </Switch>
      </Container>
    </MuiThemeProvider>
  </Router>;

const mapStateToProps = state => {
  return {
    isAuth: state.user !== null
  }
}

export default compose(
  connect(mapStateToProps),
  withTheme()
)(App);
