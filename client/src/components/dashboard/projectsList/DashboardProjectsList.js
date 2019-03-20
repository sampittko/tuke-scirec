import './DashboardProjectsList.scss';

import { Fade, List, ListItem, ListItemText, Typography } from '@material-ui/core';

import DashboardProjectsListNoData from './DashboardProjectsListNoData';
import React from 'react';
import { connect } from 'react-redux';
import { dashboardConfig } from '../../../config/app';
import dashboardPropTypes from '../../../propTypes/dashboardPropTypes';
import { getProjectRoute } from '../../../utils/projectUtils';
import propTypes from 'prop-types';
import { timeouts } from '../../../config/mui';

class ProjectsList extends React.Component {
  render() {
    return (
      <div>
        {this.props.activeDashboard !== dashboardConfig.MAX_COUNT && !this.props.isDashboardLoading && (
          <div className="projects-list">
            {this.props.projectsList.length > 0 ? (
              <Fade in timeout={timeouts.FADE_IN}>
                <div>
                  <Typography
                    className="page-title"
                    variant="h5"
                  >
                    Projekty
                  </Typography>
                  <List className="">
                    {this.props.projectsList.map(listItem => (
                      <ListItem button
                        key={listItem.project.id}
                        onClick={() => this.props.history.push(getProjectRoute(this.props.activeDashboard.data().route, listItem.route))}
                      >
                        <ListItemText inset
                          primary={listItem.title}
                          secondary="Random text"
                        />
                      </ListItem>
                    ))}
                  </List>
                </div>
              </Fade>
            ) : (
              <DashboardProjectsListNoData
                isDashboardLoading={this.props.isDashboardLoading}
                activeDashboard={this.props.activeDashboard}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

ProjectsList.propTypes = {
  projectsList: propTypes.arrayOf(propTypes.object).isRequired,
  isDashboardLoading: dashboardPropTypes.isLoading.isRequired,
  activeDashboard: propTypes.any,
  history: propTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    projectsList: state.dashboard.data.projectsList,
    isDashboardLoading: state.dashboard.isLoading,
    activeDashboard: state.dashboard.selector.active,
  }
}

export default connect(mapStateToProps)(ProjectsList);