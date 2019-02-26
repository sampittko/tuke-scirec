import React from 'react';
import routes from './config/app/routes';
import propTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { getAppTheme } from './config/app/themes';
import { withTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getAuth } from './store/actions/authActions';
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

class App extends React.Component {
  componentDidMount() {
    this.props.getAuth();
  }

  render() {
    return (
      <Router basename={window.basename}>
        <MuiThemeProvider
          theme={
            getAppTheme(
              this.props.activeDashboard,
              this.props.isAuth,
              this.props.isDashboardLoading,
              this.props.themePicker
            )
          }
        >
          <Container>
            <PrivateRoute exact path={routes.dashboard} component={Dashboard} isAuth={this.props.isAuth} />
            <PrivateRoute exact path={routes.project.new} component={NewProject} isAuth={this.props.isAuth} />
            <Route exact path={routes.home} component={Home} />
            <Route exact path={routes.auth.register} component={Register} />
            <Route exact path={routes.auth.login} component={Login} />
          </Container>
        </MuiThemeProvider>
      </Router>
    )
  }
}

App.propTypes = {
  isAuth: propTypes.bool.isRequired,
  isDashboardLoading: propTypes.bool.isRequired,
  activeDashboard: propTypes.any,
  themePicker: propTypes.object.isRequired,
  getAuth: propTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    getAuth: () => dispatch(getAuth())
  }
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
  connect(mapStateToProps, mapDispatchToProps)
)(App);
