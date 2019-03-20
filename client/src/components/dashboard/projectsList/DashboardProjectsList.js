import './DashboardProjectsList.scss';

import { Fade, List, ListItem, ListItemText, Typography } from '@material-ui/core';

import DashboardProjectsListNoData from './DashboardProjectsListNoData';
import React from 'react';
import { connect } from 'react-redux';
import { dashboardConfig } from '../../../config/app';
import dashboardPropTypes from '../../../propTypes/dashboardPropTypes';
import { getProjectRoute } from '../../../utils/projectUtils';
import { getProjects } from '../../../store/actions/projectActions';
import projectPropTypes from '../../../propTypes/projectPropTypes';
import propTypes from 'prop-types';
import { timeouts } from '../../../config/mui';

class ProjectsList extends React.Component {
  componentDidMount() {
    if (this.props.activeDashboard !== dashboardConfig.MAX_COUNT && !this.props.isProjectLoading && !this.props.projects) {
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
              <List className="">
                {this.props.projects.map(project => (
                  <ListItem button
                    key={project.id}
                    onClick={() => this.props.history.push(getProjectRoute(this.props.activeDashboard.data().route, project.data().route))}
                  >
                    <ListItemText inset
                      primary={project.data().title}
                      secondary={new Date().getTimezoneOffset()}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          </Fade>
        ) : (
          <DashboardProjectsListNoData
            isProjectLoading={this.props.isProjectLoading}
            activeDashboard={this.props.activeDashboard}
          />
        )}
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeDashboard !== this.props.activeDashboard && this.props.activeDashboard !== dashboardConfig.MAX_COUNT) {
      if (!this.props.isProjectLoading && !this.props.projects) {
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
}

const mapDispatchToProps = dispatch => {
  return {
    getProjects: () => dispatch(getProjects()),
  }
}

const mapStateToProps = state => {
  return {
    isDashboardLoading: state.dashboard.isLoading,
    isProjectLoading: state.project.isLoading,
    activeDashboard: state.dashboard.selector.active,
    projects: state.project.data.list,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);