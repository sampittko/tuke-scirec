import {Fade, Typography} from '@material-ui/core';
import React from 'react';
import propTypes from 'prop-types';
import {timeouts} from '../../../../config/mui';
import projectPropTypes from "../../../../propTypes/projectPropTypes";

const NoData = props =>
  <Fade in timeouts={timeouts.FADE_IN}>
    <div style={{textAlign: 'center', opacity: 0.7}}>
      {!props.activeProject || props.isProjectVersionLoading ? (
        <Typography>
          Verzie sa načítavajú..
        </Typography>
      ) : (
        <div>
          <Typography variant="h6">
            Projekt zatiaľ nemá žiadne verzie
          </Typography>
          <Typography>
            Tu sa zobrazia Vami vytvorené verzie pre projekt {props.activeProject.data().title}
          </Typography>
        </div>
      )}
    </div>
  </Fade>;

NoData.propTypes = {
  isProjectVersionLoading: projectPropTypes.isLoading.isRequired,
  activeProject: propTypes.object,
};

export default NoData;