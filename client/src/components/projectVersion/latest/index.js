import React from 'react';
import Typography from "@material-ui/core/Typography";
import propTypes from 'prop-types';
import ProjectVersion from "../.";
import NoData from "./NoData";
import './index.scss';

const Latest = props =>
  <div className="latest-project-version">
    {props.activeProject.data().versionsCount > 0 ? (
      <div>
        <Typography variant="h6" className="page-title">
          Najnovšia verzia
        </Typography>
        <ProjectVersion current/>
      </div>
    ) : (
      <NoData activeProject={props.activeProject}/>
    )}
  </div>;

Latest.propTypes = {
  activeProject: propTypes.object.isRequired,
};

export default Latest;