import {Fade, Typography} from '@material-ui/core';

import React from 'react';
import dashboardPropTypes from '../../../propTypes/dashboardPropTypes';
import propTypes from 'prop-types';
import {timeouts} from '../../../config/mui';
import projectPropTypes from "../../../propTypes/projectPropTypes";

const NoData = props =>
  <Fade in timeouts={timeouts.FADE_IN}>
    <div style={{textAlign: 'center', opacity: 0.7}}>
      {props.isProjectLoading || props.isDashboardLoading ? (
        <Typography>
          Nástenka sa načítava..
        </Typography>
      ) : (
        <div>
          <Typography variant="h6">
            Nástenka je prázdna
          </Typography>
          <Typography>
            Tu sa zobrazia Vami vytvorené projekty pre nástenku {props.activeDashboard.data().title}
          </Typography>
        </div>
      )}
    </div>
  </Fade>;

NoData.propTypes = {
  isProjectLoading: projectPropTypes.isLoading.isRequired,
  isDashboardLoading: dashboardPropTypes.isLoading.isRequired,
  activeDashboard: propTypes.object,
};

export default NoData;