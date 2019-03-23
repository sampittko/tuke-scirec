import {Fade, Paper} from '@material-ui/core';
import React from 'react';
import {connect} from 'react-redux';
import {getProjectDocumentTitle} from '../../utils/projectUtils';
import propTypes from 'prop-types';
import {timeouts} from '../../config/mui';
import {withRouter} from 'react-router';

import './index.scss';
import Typography from "@material-ui/core/Typography";

class Project extends React.Component {
  render() {
    return (
      <Fade in timeout={timeouts.FADE_IN}>
        <div>
          {this.props.activeDashboard && this.props.activeProject && (
            <Paper className="project">
              <Typography variant="h5">
                {this.props.activeProject.data().title}
              </Typography>
            </Paper>
          )}
        </div>
      </Fade>
    );
  }

  componentDidMount() {
    if (this.props.activeDashboard && this.props.activeProject) {
      document.title = getProjectDocumentTitle(this.props.activeDashboard, this.props.activeProject);
    }
  }
}

Project.propTypes = {
  activeDashboard: propTypes.object,
  project: propTypes.object
};

const mapStateToProps = state => {
  return {
    activeDashboard: state.dashboard.selector.active,
    activeProject: state.project.data.active,
  }
};

export default withRouter(connect(mapStateToProps)(Project));