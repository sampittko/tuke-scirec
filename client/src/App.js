import React from 'react';
import routes from './config/app/routes';
import propTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { getAppTheme } from './config/app/themes';
import { withTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Container from './components/common/Container';
import NewProject from './components/project/NewProject';
import Home from './components/Home';
import './index.scss';

const PrivateRoute = ({ component: Component, isAuth, ...rest}) => (
  <Route {...rest} render={props => isAuth ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: routes.auth.login,
          state: { from: props.location }
        }}
      />
    )}
  />
);

const App = props =>
  <Router basename={window.basename}>
    <MuiThemeProvider
      theme={
        getAppTheme(
          props.activeDashboard,
          props.isAuth,
          props.isDashboardLoading,
          props.themePicker
        )
      }
    >
      <Container>
        <PrivateRoute exact path={routes.dashboard} component={Dashboard} isAuth={props.isAuth} />
        <PrivateRoute exact path={routes.project.new} component={NewProject} isAuth={props.isAuth} />
        <Route exact path={routes.home} component={Home} />
        <Route exact path={routes.auth.register} component={Register} />
        <Route exact path={routes.auth.login} component={Login} />
      </Container>
    </MuiThemeProvider>
  </Router>;

App.propTypes = {
  isAuth: propTypes.bool.isRequired,
  isDashboardLoading: propTypes.bool.isRequired,
  activeDashboard: propTypes.any,
  themePicker: propTypes.object
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.success,
    isDashboardLoading: state.dashboard.isLoading,
    activeDashboard: state.dashboard.selector.active,
    themePicker: state.themePicker
  }
}

export default compose(
  withTheme(),
  connect(mapStateToProps)
)(App);
