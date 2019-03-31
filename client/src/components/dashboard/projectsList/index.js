import {Fade, ListItem, ListItemText, Paper, Typography} from '@material-ui/core';
import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {dashboardConfig} from '../../../config/app';
import {timeouts} from '../../../config/mui';
import dashboardPropTypes from '../../../propTypes/dashboardPropTypes';
import projectPropTypes from '../../../propTypes/projectPropTypes';
import {getProjects, setActiveProject} from '../../../store/actions/projectActions';
import {getProjectRoute, getProjectStateColor, getReadableProjectState} from '../../../utils/projectUtils';
import List from '../../common/List';
import NoData from './NoData';
import Counter from "./Counter";
import TimestampText from '../../common/TimestampText';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Chip from "@material-ui/core/Chip";

class ProjectsList extends React.Component {
  componentDidMount() {
    if (this.props.activeDashboard !== dashboardConfig.MAX_COUNT && !this.props.isProjectLoading && !this.props.projects && !this.props.isDashboardLoading) {
      this.props.getProjects();
    }
  }

  handleClick = (event, project) => {
    this.props.setProject(project);
    this.props.history.push(getProjectRoute(this.props.activeDashboard.data().route, project.data().route));
  };

  render() {
    return (
      <div>
        {!this.props.isDashboardLoading && this.props.projects && this.props.projects.length > 0 && !this.props.isProjectLoading ? (
          <Fade in timeout={timeouts.FADE_IN}>
            <div>
              <Typography
                className="page-title"
                variant="h5"
              >
                Projekty
              </Typography>
              <Paper>
                <List>
                  {this.props.projects.map(project => (
                    <ListItem button
                              key={project.id}
                              className="item"
                              onClick={(event) => this.handleClick(event, project)}
                    >
                      <ListItemText inset
                                    primary={project.data().title}
                                    secondary={(
                                      <TimestampText
                                        timestamp={project.data().modified}
                                        frontText="Naposledy upravené:"
                                      />
                                    )}
                      />
                      <ListItemSecondaryAction className="state">
                        <Chip
                          variant="outlined"
                          label={getReadableProjectState(project.data().state)}
                          color={getProjectStateColor(project.data().state)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Paper>
              <Counter projectsCount={this.props.projects.length}/>
            </div>
          </Fade>
        ) : (
          <NoData
            isProjectLoading={this.props.isProjectLoading}
            isDashboardLoading={this.props.isDashboardLoading}
            activeDashboard={this.props.activeDashboard}
          />
        )}
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
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
    setProject: project => dispatch(setActiveProject(project)),
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