import './ProjectsList.scss';

import { List, ListItem, ListItemText, Typography } from '@material-ui/core';

import React from 'react';
import { connect } from 'react-redux';
import { getProjects } from '../../store/actions/projectActions';
import projectPropTypes from '../../propTypes/projectPropTypes';
import propTypes from 'prop-types';

class ProjectsList extends React.Component {
  componentDidMount() {
    // TODO add dashboard ID as param
    this.props.getProjects();
  }

  render() {
    return (
      <div>
        <Typography className="title" variant="h5">
          Projects
        </Typography>
        <List>
          {this.props.projects && this.props.projects.map(project => (
            <ListItem button key={project.created}>
              <ListItemText inset primary={project.title} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

ProjectsList.propTypes = {
  activeDashboardRoute: propTypes.string.isRequired,
  getProjects: propTypes.func.isRequired,
  projects: propTypes.arrayOf(projectPropTypes.project),
}

const mapDispatchToProps = dispatch => {
  return {
    getProjects: dashboardId => dispatch(getProjects(dashboardId)),
  }
}

export default connect(null, mapDispatchToProps)(ProjectsList);