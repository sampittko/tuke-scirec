import React from 'react';
import { withRouter } from 'react-router';
import propTypes from 'prop-types';
import { Grid, LinearProgress, Fade } from '@material-ui/core';
import Appbar from './appbar/Appbar';
import { connect } from 'react-redux';
import { timeouts } from '../../config/app/ui';
import './Container.scss';

const Container = props =>
  <Grid container>
    <Grid item xs={12}>
      <Appbar location={props.location} />
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
  location: propTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    isAppLoading: state.user.isLoading || state.dashboard.isLoading
  }
}

export default withRouter(connect(mapStateToProps)(Container));
