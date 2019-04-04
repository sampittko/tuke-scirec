import React from 'react';
import propTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";
import Detail from "./detail";
import Review from "./review";
import './index.scss';
import {connect} from "react-redux";
import {timeouts} from "../../config/mui";
import Fade from "@material-ui/core/Fade";

const ProjectVersion = props =>
  <Fade in timeout={timeouts.FADE_IN}>
    <div className={`project-version ${props.latest ? "latest" : ""}`}>
      {!props.latest && props.activeProjectVersion && (
        <Grid container>
          <Grid item>
            <Typography variant="h5" className="page-title">
              Verzia {props.activeProjectVersion.data().versionNum} projektu <span
              className="text-bolder">{props.activeProject.data().title}</span>
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
  activeProject: propTypes.object,
  activeProjectVersion: propTypes.object,
};

const mapStateToProps = state => {
  return {
    activeProject: state.project.data.active,
    activeProjectVersion: state.projectVersion.data.active,
  }
};

export default connect(mapStateToProps)(ProjectVersion);