import React from 'react';
import propTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";
import Detail from "./detail";
import Review from "./review";
import './index.scss';

const ProjectVersion = props =>
  <div className="project-version">
    {!props.current && (
      <Grid container>
        <Grid item>
          <Typography variant="h5" className="page-title">
            Verzia <span className="text-bolder">{props.newVersionView ? "1" : "X"}</span>
          </Typography>
        </Grid>
      </Grid>
    )}
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Detail current={props.current}/>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Review current={props.current}/>
      </Grid>
    </Grid>
  </div>;

ProjectVersion.propTypes = {
  current: propTypes.bool,
  newVersionView: propTypes.bool,
};

export default ProjectVersion;