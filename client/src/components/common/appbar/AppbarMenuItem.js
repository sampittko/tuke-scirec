import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';

import React from 'react';
import propTypes from 'prop-types';

const MenuItemComponent = props =>
  <MenuItem
    disabled={props.disabled}
    onClick={props.onClick}>
    <ListItemIcon>
      {props.icon}
    </ListItemIcon>
    <ListItemText inset primary={props.text} />
  </MenuItem>;

MenuItemComponent.propTypes = {
  icon: propTypes.element.isRequired,
  text: propTypes.string.isRequired,
  disabled: propTypes.bool,
  onClick: propTypes.func
}

export default MenuItemComponent;