import {Fade, List, Paper, Typography} from '@material-ui/core';
import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {dashboardConfig} from '../../../config/app';
import {timeouts} from '../../../config/mui';
import {getProjects, setActiveProject} from '../../../store/actions/projectActions';
import {getProjectRoute, getProjectStateColor, getReadableProjectState} from '../../../utils/projectUtils';
import NoData from './NoData';
import Counter from "./Counter";
import ListItem from "../../common/ListItem";
import {getRouteFromString} from "../../../utils/appConfigUtils";

class ProjectsList extends React.Component {
  componentDidMount() {
    if (this.props.activeDashboard !== dashboardConfig.MAX_COUNT && !this.props.isProjectLoading && !this.props.projects && !this.props.isDashboardLoading) {
      this.props.getProjects();
    }
  }

  handleClick = (event, project) => {
    this.props.setProject(project);
    this.props.history.push(getProjectRoute(getRouteFromString(this.props.activeDashboard.data().title), getRouteFromString(project.data().title)));
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
                  {this.props.projects.map((project, i) => (
                    <ListItem
                      key={i}
                      title={project.data().title}
                      item={project}
                      modifiedTimestamp={project.data().meta.modified}
                      onClick={(event) => this.handleClick(event, project)}
                      chipLabel={getReadableProjectState(project.data().overview.state)}
                      chipColor={getProjectStateColor(project.data().overview.state)}
                    />
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
  isDashboardLoading: propTypes.bool.isRequired,
  isProjectLoading: propTypes.bool.isRequired,
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