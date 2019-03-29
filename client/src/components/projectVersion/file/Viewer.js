import React from 'react';
import {Button, ListItem, Typography} from "@material-ui/core";
import propTypes from 'prop-types';
import './Viewer.scss';
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

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
                  <Button
                    size="small"
                    onClick={this.props.onClick}
                  >
                    Pridať súbory
                  </Button>
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
  onClick: propTypes.func.isRequired,
};

export default Viewer;