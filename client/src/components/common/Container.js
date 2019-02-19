import React from 'react';
import { withRouter } from 'react-router';
import propTypes from 'prop-types';
import { Grid, LinearProgress, Fade } from '@material-ui/core';
import Appbar from './appbar/Appbar';
import { connect } from 'react-redux';
import { transitions } from '../../config/app/ui';
import './Container.scss';

const Container = props =>
  <Grid container>
    <Grid item xs={12}>
      <Appbar location={props.location} />
      {props.isLoading &&
        <Fade
          in
          timeout={transitions.FADE_IN_TIMEOUT}
        >
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
  isLoading: propTypes.bool.isRequired,
  children: propTypes.array.isRequired,
  location: propTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    isLoading: state.user.isLoading
  }
}

export default withRouter(connect(mapStateToProps)(Container));
