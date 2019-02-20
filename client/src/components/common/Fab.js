import React from 'react';
import propTypes from 'prop-types';
import { Zoom, Fab } from '@material-ui/core';
import { timeouts } from '../../config/app/ui'
import './Fab.scss';

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