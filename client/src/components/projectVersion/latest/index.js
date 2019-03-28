import React from 'react';
import Typography from "@material-ui/core/Typography";
import propTypes from 'prop-types';
import ProjectVersion from "../.";
import NoData from "./NoData";
import './index.scss';
import {Fade} from "@material-ui/core";
import {timeouts} from "../../../config/mui";

const Latest = props =>
  <div
    className={`latest-project-version ${props.activeProject.data().versionsCount > 0 || props.newVersionView ? "" : "empty"}`}>
    {props.activeProject.data().versionsCount > 0 || props.newVersionView ? (
      <Fade in timeout={timeouts.FADE_IN}>
        <div>
          <Typography variant="h6" className="page-title">
            Najnovšia verzia
          </Typography>
          <ProjectVersion newVersionView={props.newVersionView} latest/>
        </div>
      </Fade>
    ) : (
      <NoData activeProject={props.activeProject}/>
    )}
  </div>;

Latest.propTypes = {
  activeProject: propTypes.object.isRequired,
  newVersionView: propTypes.bool,
};

export default Latest;