import './Container.scss';

import { Fade, Grid, LinearProgress } from '@material-ui/core';

import Appbar from './appbar/Appbar';
import React from 'react';
import { connect } from 'react-redux';
import { getDashboardRoute } from '../../utils/dashboardUtils';
import propTypes from 'prop-types';
import { timeouts } from '../../config/mui';
import { withRouter } from 'react-router';

const Container = props =>
  <Grid container
    className={props.location.pathname === getDashboardRoute(props.activeDashboardRoute) ? "double-toolbar-margin" : "toolbar-margin"}
  >
    <Grid item xs={12}>
      <Appbar />
      {props.isAppLoading &&
        <Fade in timeout={timeouts.FADE_IN}>
          <LinearProgress
            color="secondary"
            variant="indeterminate"
          />
        </Fade>
      }
    </Grid>
    <Grid item xs={12}>
      {props.children}
    </Grid>
  </Grid>;

Container.propTypes = {
  isAppLoading: propTypes.bool.isRequired,
  children: propTypes.array.isRequired,
  location: propTypes.object.isRequired,
  activeDashboardRoute: propTypes.string,
}

const mapStateToProps = state => {
  return {
    isAppLoading: state.auth.isLoading || state.dashboard.isLoading || state.project.isLoading,
    activeDashboardRoute: state.dashboard.selector.activeRoute || "",
  }
}

export default withRouter(connect(mapStateToProps)(Container));
