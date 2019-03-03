import './index.scss';

import { MuiThemeProvider, withTheme } from '@material-ui/core/styles';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';

import Container from './components/common/Container';
import Dashboard from './components/dashboard/Dashboard';
import DashboardSettings from './components/dashboard/settings/DashboardSettings';
import Home from './components/Home';
import Login from './components/auth/Login';
import NewProject from './components/project/NewProject';
import React from 'react';
import Register from './components/auth/Register';
import authPropTypes from './propTypes/authPropTypes';
import { compose } from 'redux';
import { connect } from 'react-redux';
import dashboardPropTypes from './propTypes/dashboardPropTypes';
import { getAppTheme } from './utils/muiConfigUtils';
import { getAuth } from './store/actions/authActions';
import { getDashboards } from './store/actions/dashboardActions';
import propTypes from 'prop-types';
import routes from './config/app/routes';
import themePickerPropTypes from './propTypes/themePickerPropTypes';

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
            <PrivateRoute
              exact
              path={routes.DASHBOARD}
              component={Dashboard}
              isAuth={this.props.isAuth}
            />
            <PrivateRoute
              exact
              path={routes.DASHBOARD_SETTINGS}
              component={DashboardSettings}
              isAuth={this.props.isAuth}
            />
            <PrivateRoute
              exact
              path={routes.NEW_PROJECT}
              component={NewProject}
              isAuth={this.props.isAuth}
            />
            <Route
              exact
              path={routes.HOME}
              component={Home}
            />
            <Route
              exact
              path={routes.REGISTER}
              component={Register}
            />
            <Route
              exact
              path={routes.LOGIN}
              component={Login}
            />
          </Container>
        </MuiThemeProvider>
      </Router>
    )
  }

  componentDidUpdate() {
    if (this.props.isAuth && this.props.userId && !this.props.isDashboardLoading && !this.props.dashboards) {
      this.props.getDashboards(this.props.userId);
    }
  }
}

App.propTypes = {
  isAuth: authPropTypes.success.isRequired,
  isDashboardLoading: dashboardPropTypes.isLoading.isRequired,
  activeDashboard: propTypes.any,
  themePicker: themePickerPropTypes.themePicker.isRequired,
  getAuth: propTypes.func.isRequired,
  getDashboards: propTypes.func.isRequired,
  userId: propTypes.string,
  dashboards: propTypes.arrayOf(dashboardPropTypes.dashboard),
}

const mapDispatchToProps = dispatch => {
  return {
    getAuth: () => dispatch(getAuth()),
    getDashboards: userId => dispatch(getDashboards(userId))
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.success,
    isDashboardLoading: state.dashboard.isLoading,
    activeDashboard: state.dashboard.selector.active,
    themePicker: state.themePicker,
    userId: state.firebase.auth.uid,
    dashboards: state.dashboard.data.list,
  }
}

export default compose(
  withTheme(),
  connect(mapStateToProps, mapDispatchToProps)
)(App);
