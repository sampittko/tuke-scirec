import {Fade, Typography} from '@material-ui/core';
import React from 'react';
import {timeouts} from '../../../config/mui';

const NoData = () =>
  <Fade in timeouts={timeouts.FADE_IN}>
    <div className="no-data">
      <Typography>
        Verzia projektu zatiaľ nemá posudky
      </Typography>
    </div>
  </Fade>;

export default NoData;