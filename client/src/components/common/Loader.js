import React from 'react';
import {CircularProgress} from "@material-ui/core";
import './Loader.scss';
import {timeouts} from "../../config/mui";
import Fade from "@material-ui/core/Fade";

const Loader = () =>
  <Fade in timeout={timeouts.FADE_IN}>
    <div className="loader">
      <CircularProgress
        className="circular-progress"
        variant="indeterminate"
        color="inherit"
      />
    </div>
  </Fade>;

export default Loader;