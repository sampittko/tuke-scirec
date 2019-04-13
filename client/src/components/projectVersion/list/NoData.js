import {Fade, Typography} from '@material-ui/core';

import React from 'react';
import propTypes from 'prop-types';
import {timeouts} from '../../../config/mui';

const NoData = props =>
  <Fade in timeouts={timeouts.FADE_IN}>
    <div className="no-data">
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
            Tu sa zobrazia Vami pridané verzie projektu {props.activeProject.data().title}
          </Typography>
        </div>
      )}
    </div>
  </Fade>;

NoData.propTypes = {
  isProjectVersionLoading: propTypes.bool.isRequired,
  activeProject: propTypes.object,
};

export default NoData;