import './DashboardProjectsList.scss';

import { Fade, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';

import React from 'react';
import { connect } from 'react-redux';
import { dashboardConfig } from '../../config/app';
import dashboardPropTypes from '../../propTypes/dashboardPropTypes';
import propTypes from 'prop-types';
import { timeouts } from '../../config/mui';

class ProjectsList extends React.Component {
  render() {
    return (
      <div>
        {this.props.activeDashboard !== dashboardConfig.MAX_COUNT && (
          <div>
            {this.props.projects ? (
              <Fade in timeout={timeouts.FADE_IN}>
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
              </Fade>
            ) : (
              <Fade in timeouts={timeouts.FADE_IN}>
                <div className="no-data">
                  {this.props.isDashboardLoading ? (
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
              </Fade>
            )}
          </div>
        )}
      </div>
    );
  }
}

ProjectsList.propTypes = {
  projects: propTypes.arrayOf(propTypes.object),
  isDashboardLoading: dashboardPropTypes.isLoading.isRequired,
  activeDashboard: propTypes.any,
  previousDashboardId: propTypes.any,
}

const mapStateToProps = state => {
  return {
    projects: state.project.data.list,
    isDashboardLoading: state.dashboard.isLoading,
    activeDashboard: state.dashboard.selector.active,
    previousDashboardId: state.dashboard.selector.previousId,
  }
}

export default connect(mapStateToProps)(ProjectsList);