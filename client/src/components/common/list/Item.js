import React from 'react';
import {Chip, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import ModifiedTimestampText from "./ModifiedTimestampText";
import propTypes from 'prop-types';
import './Item.scss';

const Item = props =>
  <div className="list-item">
    <ListItem
      button
      className="list-item"
      onClick={(event) => props.onClick(event, props.item)}
    >
      <ListItemText
        inset
        primary={props.title}
        secondary={<ModifiedTimestampText modifiedTimestamp={props.modifiedTimestamp}/>}
      />
      <ListItemSecondaryAction className="state">
        <Chip
          variant="outlined"
          label={props.chipLabel}
          color={props.chipColor}
        />
      </ListItemSecondaryAction>
    </ListItem>
  </div>;

Item.propTypes = {
  title: propTypes.string.isRequired,
  item: propTypes.object.isRequired,
  modifiedTimestamp: propTypes.object.isRequired,
  onClick: propTypes.func.isRequired,
  chipLabel: propTypes.string.isRequired,
  chipColor: propTypes.string,
};

export default Item;