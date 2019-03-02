import './Fab.scss';

import { Fab, Zoom } from '@material-ui/core';

import React from 'react';
import propTypes from 'prop-types';
import { timeouts } from '../../config/mui'

const FabComponent = props =>
  <Zoom in timeout={timeouts.ZOOM_IN}>
    <Fab
      onClick={props.onClick}
      className="fab"
      color="secondary"
    >
      {props.icon}
    </Fab>
  </Zoom>;

FabComponent.propTypes = {
  onClick: propTypes.func.isRequired,
  icon: propTypes.element.isRequired
}

export default FabComponent;