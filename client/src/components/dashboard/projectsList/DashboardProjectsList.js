import { Fade, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';

import DashboardProjectsListNoData from './DashboardProjectsListNoData';
import React from 'react';
import { connect } from 'react-redux';
import { dashboardConfig } from '../../../config/app';
import dashboardPropTypes from '../../../propTypes/dashboardPropTypes';
import propTypes from 'prop-types';
import { timeouts } from '../../../config/mui';

class ProjectsList extends React.Component {
  render() {
    return (
      <div>
        {this.props.activeDashboard !== dashboardConfig.MAX_COUNT && !this.props.isDashboardLoading && (
          <div>
            {this.props.projectsList.length > 0 ? (
              <Fade in timeout={timeouts.FADE_IN}>
                <Paper className="dashboard">
                  <Typography className="title" variant="h5">
                    Projects
                  </Typography>
                  <List>
                    {this.props.projectsList.map(listItem => (
                      <ListItem button key={listItem.project.id}>
                        <ListItemText inset primary={listItem.title} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
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
}

const mapStateToProps = state => {
  return {
    projectsList: state.dashboard.data.projectsList,
    isDashboardLoading: state.dashboard.isLoading,
    activeDashboard: state.dashboard.selector.active,
  }
}

export default connect(mapStateToProps)(ProjectsList);