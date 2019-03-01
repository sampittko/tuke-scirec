import React from 'react';
import routes from './config/app/routes';
import propTypes from 'prop-types';
import dashboardPropTypes from './propTypes/dashboardPropTypes';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { getAppTheme } from './config/mui/themes';
import { withTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getAuth } from './store/actions/authActions';
import { getDashboards } from './store/actions/dashboardActions';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Container from './components/common/Container';
import NewProject from './components/project/NewProject';
import Welcome from './components/Welcome';
import './index.scss';

const PrivateRoute = ({ component: Component, isAuth, ...rest}) => (
  <Route {...rest} render={props => isAuth ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: routes.LOGIN,
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

  componentDidUpdate() {
    if (this.props.isAuth && !this.props.isDashboardLoading && !this.props.dashboards) {
      this.props.getDashboards(this.props.userId);
    }
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
            <PrivateRoute exact path={routes.DASHBOARD} component={Dashboard} isAuth={this.props.isAuth} />
            <PrivateRoute exact path={routes.NEW_PROJECT} component={NewProject} isAuth={this.props.isAuth} />
            <Route exact path={routes.HOME} component={Welcome} />
            <Route exact path={routes.REGISTER} component={Register} />
            <Route exact path={routes.LOGIN} component={Login} />
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
  getAuth: propTypes.func.isRequired,
  dashboards: propTypes.arrayOf(dashboardPropTypes.dashboard),
  getDashboards: propTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    getAuth: () => dispatch(getAuth()),
    getDashboards: userId => dispatch(getDashboards(userId))
  }
}

const mapStateToProps = state => {
  return {
    dashboards: state.dashboard.data.list,
    userId: state.firebase.auth.uid,
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
