import React from 'react';
import {Chip, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import TimestampText from "./TimestampText";
import propTypes from 'prop-types';
import './ListItem.scss';

const ListItemComponent = props =>
  <div className="list-item">
    <ListItem
      button
      disabled={props.disabled}
      className="list-item"
      onClick={(event) => props.onClick(event, props.item)}
    >
      <ListItemText
        inset
        primary={props.title}
        secondary={<TimestampText label="Naposledy upravené" timestamp={props.modifiedTimestamp}/>}
      />
      <ListItemSecondaryAction className="state">
        <Chip
          variant="outlined"
          label={props.chipLabel}
          color={props.chipColor}
          className={props.disabled ? "disabled" : ""}
        />
      </ListItemSecondaryAction>
    </ListItem>
  </div>;

ListItemComponent.propTypes = {
  disabled: propTypes.bool,
  title: propTypes.string.isRequired,
  item: propTypes.object.isRequired,
  modifiedTimestamp: propTypes.object.isRequired,
  onClick: propTypes.func.isRequired,
  chipLabel: propTypes.string.isRequired,
  chipColor: propTypes.string,
};

export default ListItemComponent;