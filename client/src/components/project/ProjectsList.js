import './ProjectsList.scss';

import { List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';

import React from 'react';
import { connect } from 'react-redux';
import { dashboardConfig } from '../../config/app';
import dashboardPropTypes from '../../propTypes/dashboardPropTypes';
import { getProjects } from '../../store/actions/projectActions';
import projectPropTypes from '../../propTypes/projectPropTypes';
import propTypes from 'prop-types';

class ProjectsList extends React.Component {
  componentDidMount() {
    if (this.props.activeDashboard && this.props.previousDashboardId !== dashboardConfig.MAX_COUNT && this.props.activeDashboard !== dashboardConfig.MAX_COUNT) {
      this.props.getProjects(this.props.activeDashboard.id);
    }
  }

  render() {
    return (
      <div>
        {this.props.activeDashboard !== dashboardConfig.MAX_COUNT && (
          <div>
            {this.props.projects ? (
              <Paper className="dashboard">
                <Typography className="title" variant="h5">
                  Projects
                </Typography>
                <List>
                  {this.props.projects.map(project => (
                    <ListItem button key={project.id}>
                      <ListItemText inset primary={project.title} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            ) : (
              <div className="no-data">
                  {(this.props.isDashboardLoading && !this.props.isProjectLoading) || this.props.isProjectLoading ? (
                  <Typography>
                    Projekty sa načítavajú..
                  </Typography>
                ) : (
                  <div>
                    <Typography variant="h6">
                      Nástenka je prázdna
                    </Typography>
                    <Typography>
                      Tu sa zobrazia Vami vytvorené projekty pre nástenku {this.props.activeDashboard.data().title}
                    </Typography>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeDashboard !== prevProps.activeDashboard && this.props.previousDashboardId !== dashboardConfig.MAX_COUNT && this.props.activeDashboard !== dashboardConfig.MAX_COUNT) {
      this.props.getProjects(this.props.activeDashboard.id);
    }
  }
}

ProjectsList.propTypes = {
  getProjects: propTypes.func.isRequired,
  projects: propTypes.arrayOf(projectPropTypes.project),
  isDashboardLoading: dashboardPropTypes.isLoading.isRequired,
  isProjectLoading: projectPropTypes.isLoading.isRequired,
  activeDashboard: propTypes.any,
  previousDashboardId: propTypes.any,
}

const mapDispatchToProps = dispatch => {
  return {
    getProjects: dashboardId => dispatch(getProjects(dashboardId)),
  }
}

const mapStateToProps = state => {
  return {
    projects: state.project.data.list,
    isProjectLoading: state.project.isLoading,
    isDashboardLoading: state.dashboard.isLoading,
    activeDashboard: state.dashboard.selector.active,
    previousDashboardId: state.dashboard.selector.previousId,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);