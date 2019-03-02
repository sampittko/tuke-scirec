import './ProjectsList.scss';

import { List, ListItem, ListItemText, Typography } from '@material-ui/core';

import React from 'react';

class ProjectsList extends React.Component {
  render() {
    return (
      <div>
        <Typography className="title" variant="h5">
          Projects
        </Typography>
        <List>
          <ListItem button>
            <ListItemText inset primary="Môj projekt 1" />
          </ListItem>
          <ListItem button>
            <ListItemText inset primary="Môj projekt 2" />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default ProjectsList;