import React from 'react';
import routes from './config/app/routes';
import propTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { getAppTheme } from './config/app/themes';
import { withTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Login from './components/user/Login';
import Register from './components/user/Register';
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
          pathname: routes.user.login,
          state: { from: props.location }
        }}
      />
    )}
  />
);

const App = props => 
  <Router basename={window.basename}>
    <MuiThemeProvider theme={getAppTheme(props.themeColor)}>
      <Container>
        <PrivateRoute exact path={routes.dashboard} component={Dashboard} isAuth={props.isAuth} />
        <PrivateRoute exact path={routes.project.new} component={NewProject} isAuth={props.isAuth} />
        <Route exact path={routes.home} component={Home} />
        <Route exact path={routes.user.register} component={Register} />
        <Route exact path={routes.user.login} component={Login} />
      </Container>
    </MuiThemeProvider>
  </Router>;

App.propTypes = {
  isAuth: propTypes.bool.isRequired,
  themeColor: propTypes.number.isRequired
}

const mapStateToProps = state => {
  return {
    isAuth: state.user.data !== null,
  }
}

export default compose(
  withTheme(),
  connect(mapStateToProps)
)(App);
