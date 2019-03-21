import {Fade, List, ListItem, ListItemText, Paper, Typography} from '@material-ui/core';
import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {dashboardConfig} from '../../../config/app';
import {timeouts} from '../../../config/mui';
import dashboardPropTypes from '../../../propTypes/dashboardPropTypes';
import projectPropTypes from '../../../propTypes/projectPropTypes';
import {getProjects} from '../../../store/actions/projectActions';
import {getProjectRoute} from '../../../utils/projectUtils';
import './DashboardProjectsList.scss';

import ProjectsListNoData from './DashboardProjectsListNoData';
import ProjectsListCounter from "./DashboardProjectsListCounter";

class ProjectsList extends React.Component {
  componentDidMount() {
    if (this.props.activeDashboard !== dashboardConfig.MAX_COUNT && !this.props.isProjectLoading && !this.props.projects && !this.props.isDashboardLoading) {
      this.props.getProjects();
    }
  }

  render() {
    return (
      <div className="projects-list">
        {this.props.projects && !this.props.isProjectLoading ? (
          <Fade in timeout={timeouts.FADE_IN}>
            <div>
              <Typography
                className="page-title"
                variant="h5"
              >
                Projekty
              </Typography>
              <Paper>
                <List className="list">
                  {this.props.projects.map(project => (
                    <ListItem button
                              key={project.id}
                              className="item"
                              onClick={() => this.props.history.push(getProjectRoute(this.props.activeDashboard.data().route, project.data().route))}
                    >
                      <ListItemText inset
                                    primary={project.data().title}
                                    secondary={`Naposledy upravené: ${new Date(project.data().modified.seconds).toLocaleDateString()}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
              <ProjectsListCounter projectsCount={this.props.projects.length}/>
            </div>
          </Fade>
        ) : (
          <ProjectsListNoData
            isProjectLoading={this.props.isProjectLoading}
            activeDashboard={this.props.activeDashboard}
          />
        )}
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeDashboard !== this.props.activeDashboard && this.props.activeDashboard !== dashboardConfig.MAX_COUNT) {
      if (!this.props.isDashboardLoading && !this.props.isProjectLoading && !this.props.projects) {
        this.props.getProjects();
      }
    }
  }
}

ProjectsList.propTypes = {
  isDashboardLoading: dashboardPropTypes.isLoading.isRequired,
  isProjectLoading: projectPropTypes.isLoading.isRequired,
  activeDashboard: propTypes.any,
  history: propTypes.object.isRequired,
  getProjects: propTypes.func.isRequired,
  projects: propTypes.arrayOf(propTypes.object),
};

const mapDispatchToProps = dispatch => {
  return {
    getProjects: () => dispatch(getProjects()),
  }
};

const mapStateToProps = state => {
  return {
    isDashboardLoading: state.dashboard.isLoading,
    isProjectLoading: state.project.isLoading,
    activeDashboard: state.dashboard.selector.active,
    projects: state.project.data.list,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);