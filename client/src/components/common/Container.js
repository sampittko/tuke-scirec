import React from 'react';
import { withRouter } from 'react-router';
import propTypes from 'prop-types';
import { Grid, LinearProgress, Fade } from '@material-ui/core';
import Appbar from './appbar/Appbar';
import { connect } from 'react-redux';
import { timeouts } from '../../config/mui';
import './Container.scss';
import routes from '../../config/app/routes';

const Container = props =>
  <Grid container
    className={props.location.pathname === `${routes.DASHBOARDS}/${props.activeDashboardRoute}` ? "double-toolbar-margin" : "toolbar-margin"}
  >
    <Grid item xs={12}>
      <Appbar
        location={props.location}
        history={props.history}
      />
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
    isAppLoading: state.auth.isLoading || state.dashboard.isLoading,
    activeDashboardRoute: state.dashboard.selector.activeRoute || "",
  }
}

export default withRouter(connect(mapStateToProps)(Container));
