import './Fab.scss';

import {Tooltip, Zoom, Fab} from '@material-ui/core';

import React from 'react';
import propTypes from 'prop-types';
import {timeouts} from '../../config/mui'

const FabComponent = props =>
  <Zoom in timeout={timeouts.ZOOM_IN}>
    <Tooltip
      title={props.tooltipTitle}
      placement="left"
    >
      <Fab
        onClick={props.onClick}
        className="fab"
        color="secondary"
      >
        {props.icon}
      </Fab>
    </Tooltip>
  </Zoom>;

FabComponent.propTypes = {
  onClick: propTypes.func.isRequired,
  icon: propTypes.element.isRequired,
  tooltipTitle: propTypes.string,
};

export default FabComponent;