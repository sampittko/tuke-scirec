import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import './ProjectsList.scss';

class ProjectsList extends React.Component {
    render() {
        return (
            <List>
                <ListItem button>
                    <ListItemText inset primary="Môj projekt 1" />
                </ListItem>
                <ListItem button>
                    <ListItemText inset primary="Môj projekt 2" />
                </ListItem>
            </List>
        );
    }
}

export default ProjectsList;