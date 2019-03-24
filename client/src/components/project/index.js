import './index.scss';

import {Fade} from '@material-ui/core';
import React from 'react';
import {connect} from 'react-redux';
import {getProjectDocumentTitle} from '../../utils/projectUtils';
import propTypes from 'prop-types';
import {timeouts} from '../../config/mui';
import {withRouter} from 'react-router';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Overview from "./Overview";
import Version from "./version";

class Project extends React.Component {
  componentDidMount() {
    if (this.props.activeDashboard && this.props.activeProject) {
      document.title = getProjectDocumentTitle(this.props.activeDashboard, this.props.activeProject);
    }
  }

  render() {
    return (
      <Fade in timeout={timeouts.FADE_IN}>
        <div>
          {this.props.activeDashboard && this.props.activeProject && (
            <div className="project">
              <Grid container>
                <Grid item>
                  <Typography
                    variant="h5"
                    className="page-title"
                  >
                    Projekt <span
                    className="text-bolder">{this.props.activeProject.data().title}</span>
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={4} className="col">
                  <Overview/>
                </Grid>
                <Grid item xs={12} sm={8} className="col">
                  <Version/>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </Fade>
    );
  }
}

Project.propTypes = {
  activeDashboard: propTypes.object,
  activeProject: propTypes.object
};

const mapStateToProps = state => {
  return {
    activeDashboard: state.dashboard.selector.active,
    activeProject: state.project.data.active,
  }
};

export default withRouter(connect(mapStateToProps)(Project));