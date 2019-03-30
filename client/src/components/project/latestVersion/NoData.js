import React from 'react';
import {timeouts} from "../../../config/mui";
import {Fade, Typography} from "@material-ui/core";
import propTypes from 'prop-types';

const NoData = props =>
  <Fade in timeouts={timeouts.FADE_IN}>
    <div className="no-data" style={{textAlign: 'center', opacity: 0.7}}>
      <Typography variant="h6">
        Neexistuje ešte žiadna verzia projektu
      </Typography>
      <Typography>
        Tu sa zobrazí posledná verzia projektu {props.activeProject.data().title} s jeho posudkami
      </Typography>
    </div>
  </Fade>;

NoData.propTypes = {
  activeProject: propTypes.object.isRequired,
};

export default NoData;