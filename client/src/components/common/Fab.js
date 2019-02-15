import React from 'react';
import propTypes from 'prop-types';
import { Zoom, Fab } from '@material-ui/core';
import { transitions } from '../../config/ui'
import './Fab.scss';

const FabComponent = props =>
  <Zoom in timeout={transitions.ZOOM_IN_TIMEOUT}>
    <Fab onClick={props.onClick} className="fab" color="secondary">
      {props.icon}
    </Fab>
  </Zoom>;

FabComponent.propTypes = {
  onClick: propTypes.func.isRequired,
  icon: propTypes.element.isRequired
}

export default FabComponent;