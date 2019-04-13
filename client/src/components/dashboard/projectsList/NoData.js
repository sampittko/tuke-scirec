import {Fade, Typography} from '@material-ui/core';

import React from 'react';
import propTypes from 'prop-types';
import {timeouts} from '../../../config/mui';

const NoData = props =>
  <Fade in timeouts={timeouts.FADE_IN}>
    <div className="no-data">
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
  isProjectLoading: propTypes.bool.isRequired,
  isDashboardLoading: propTypes.bool.isRequired,
  activeDashboard: propTypes.object,
};

export default NoData;