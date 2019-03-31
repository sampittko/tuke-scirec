import React from 'react';
import propTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";
import Detail from "./detail";
import Review from "./reviews";
import './index.scss';
import {connect} from "react-redux";
import {timeouts} from "../../config/mui";
import Fade from "@material-ui/core/Fade";

const ProjectVersion = props =>
  <Fade in timeout={timeouts.FADE_IN}>
    <div className="project-version">
      {!props.latest && (
        <Grid container>
          <Grid item>
            <Typography variant="h5" className="page-title">
              Verzia <span className="text-bolder">{props.activeProject.data().versionsCount}</span>
            </Typography>
          </Grid>
        </Grid>
      )}
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Detail latest={props.latest}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Review latest={props.latest}/>
        </Grid>
      </Grid>
    </div>
  </Fade>;

ProjectVersion.propTypes = {
  latest: propTypes.bool,
  activeProject: propTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    activeProject: state.project.data.active,
  }
};

export default connect(mapStateToProps)(ProjectVersion);