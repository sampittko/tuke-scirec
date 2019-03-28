import React from 'react';
import {IconButton, ListItem, Tooltip, Typography} from "@material-ui/core";
import propTypes from 'prop-types';
import './Viewer.scss';
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import NoteAddIcon from '@material-ui/icons/NoteAdd';

class Viewer extends React.Component {
  render() {
    return (
      <div className="file-viewer">
        <Typography className="small-title">Súbory</Typography>
        <List dense>
          {this.props.editable ? (
            <ListItem>
              <ListItemText
                primary={(
                  <Tooltip title="Pridať súbory" placement="bottom">
                    <IconButton className="add-files-button">
                      <NoteAddIcon fontSize="small"/>
                    </IconButton>
                  </Tooltip>
                )}
                className="list-item-text"
              />
            </ListItem>
          ) : (
            <ListItem>
              <ListItemText primary={"Žiadne súbory"} className="list-item-text"/>
            </ListItem>
          )}
        </List>
      </div>
    );
  }
}

Viewer.propTypes = {
  editable: propTypes.bool,
};

export default Viewer;