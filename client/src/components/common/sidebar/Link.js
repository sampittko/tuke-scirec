import './Link.scss';

import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';

import {Link} from 'react-router-dom';
import React from 'react';
import propTypes from 'prop-types';

const LinkComponent = props =>
  <Link
    className="link"
    to={props.route}
  >
    <ListItem
      selected={props.location.pathname === props.route}
      button
    >
      <ListItemIcon>
        {props.icon}
      </ListItemIcon>
      <ListItemText>{props.text}</ListItemText>
    </ListItem>
  </Link>;

LinkComponent.propTypes = {
  location: propTypes.object.isRequired,
  route: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  icon: propTypes.element.isRequired
};

export default LinkComponent;