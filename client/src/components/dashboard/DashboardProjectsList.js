import './DashboardProjectsList.scss';

import { List, ListItem, ListItemText, Typography } from '@material-ui/core';

import React from 'react';
import propTypes from 'prop-types';

class ProjectsList extends React.Component {
  componentDidMount() {
    console.log("Fetching projects..");
  }

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

ProjectsList.propTypes = {
  activeDashboardRoute: propTypes.string.isRequired
}

export default ProjectsList;