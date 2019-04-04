import {Fade, Typography} from '@material-ui/core';
import React from 'react';
import {timeouts} from '../../../config/mui';

const NoData = () =>
  <Fade in timeouts={timeouts.FADE_IN}>
    <div style={{textAlign: 'center', opacity: 0.7, paddingTop: '24px'}}>
      <Typography>
        Verzia projektu zatiaľ nemá žiadne posudky
      </Typography>
    </div>
  </Fade>;

export default NoData;