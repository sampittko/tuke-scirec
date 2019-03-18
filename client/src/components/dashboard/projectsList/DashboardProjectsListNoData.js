import { Fade, Typography } from '@material-ui/core';

import React from 'react';
import dashboardPropTypes from '../../../propTypes/dashboardPropTypes';
import propTypes from 'prop-types';
import { timeouts } from '../../../config/mui';

const NoData = props =>
  <Fade in timeouts={timeouts.FADE_IN}>
    <div style={{textAlign: 'center', opacity: 0.7}}>
      {props.isDashboardLoading ? (
        <Typography>
          Projekty sa načítavajú..
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
  isDashboardLoading: dashboardPropTypes.isLoading.isRequired,
  activeDashboard: propTypes.object.isRequired,
}

export default NoData;