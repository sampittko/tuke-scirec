import './Link.scss';

import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';

import {Link} from 'react-router-dom';
import React from 'react';
import propTypes from 'prop-types';

const LinkComponent = props =>
  <div className="link-component">
    <Link className="link" to={props.route}>
      <ListItem button selected={props.location.pathname === props.route}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText>{props.text}</ListItemText>
      </ListItem>
    </Link>
    {props.children && (
      <List component="div" disablePadding className="sub-menu">
        {props.children}
      </List>
    )}
  </div>;

LinkComponent.propTypes = {
  location: propTypes.object.isRequired,
  route: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  icon: propTypes.element.isRequired,
  children: propTypes.object,
};

export default LinkComponent;