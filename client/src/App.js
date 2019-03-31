import {MuiThemeProvider, withTheme} from '@material-ui/core/styles';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';

import About from './components/About';
import Container from './components/common/Container';
import Dashboard from './components/dashboard';
import DashboardSettings from './components/dashboard/settings';
import Home from './components/Home';
import Login from './components/auth/Login';
import Project from './components/project';
import ProjectVersionsList from './components/projectVersion/list';
import ProjectVersion from './components/projectVersion';
import ProjectSettings from './components/project/settings';
import React from 'react';
import Register from './components/auth/Register';
import authPropTypes from './propTypes/authPropTypes';
import {compose} from 'redux';
import {connect} from 'react-redux';
import dashboardPropTypes from './propTypes/dashboardPropTypes';
import {getAppTheme} from './utils/muiConfigUtils';
import {getAuth} from './store/actions/authActions';
import {getDashboards} from './store/actions/dashboardActions';
import propTypes from 'prop-types';
import routes from './config/app/routes';
import themePickerPropTypes from './propTypes/themePickerPropTypes';
import withInit from './components/common/withInit';

const PrivateRoute = ({component: Component, isAuth, ...rest}) =>
  <Route {...rest} render={(props) => isAuth ? (
    <Component {...props}/>
  ) : (
    <Redirect to={{
      pathname: routes.LOGIN,
      state: {from: props.location}
    }}/>
  )}/>;

class App extends React.Component {
  componentDidMount() {
    this.props.getAuth();
  }

  render() {
    return (
      <MuiThemeProvider
        theme={getAppTheme(this.props.activeDashboard, this.props.isAuth, this.props.isDashboardLoading, this.props.themePicker)}>
        <Router basename={window.basename}>
          <Container>
            <PrivateRoute exact path={routes.DASHBOARD} component={Dashboard} isAuth={this.props.isAuth}/>
            <PrivateRoute exact path={routes.DASHBOARD_SETTINGS} component={DashboardSettings}
                          isAuth={this.props.isAuth}/>
            <PrivateRoute exact path={routes.PROJECT} component={Project} isAuth={this.props.isAuth}/>
            <PrivateRoute exact path={routes.PROJECT_VERSIONS_LIST} component={ProjectVersionsList}
                          isAuth={this.props.isAuth}/>
            <PrivateRoute exact path={routes.PROJECT_VERSION} component={ProjectVersion} isAuth={this.props.isAuth}/>
            <PrivateRoute exact path={routes.PROJECT_SETTINGS} component={ProjectSettings} isAuth={this.props.isAuth}/>
            <Route exact path={routes.HOME} component={Home}/>
            <Route exact path={routes.ABOUT} component={About}/>
            <Route exact path={routes.REGISTER} component={Register}/>
            <Route exact path={routes.LOGIN} component={Login}/>
          </Container>
        </Router>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  isAuth: authPropTypes.success.isRequired,
  isDashboardLoading: dashboardPropTypes.isLoading.isRequired,
  activeDashboard: propTypes.any,
  themePicker: themePickerPropTypes.themePicker.isRequired,
  getAuth: propTypes.func.isRequired,
  dashboards: propTypes.arrayOf(propTypes.object),
  getDashboards: propTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    getAuth: () => dispatch(getAuth()),
    getDashboards: async () => dispatch(getDashboards()),
  }
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.success,
    isDashboardLoading: state.dashboard.isLoading,
    activeDashboard: state.dashboard.selector.active,
    themePicker: state.themePicker,
    dashboards: state.dashboard.data.list,
  }
};

export default compose(
  withTheme(),
  connect(mapStateToProps, mapDispatchToProps),
  withInit
)(App);
