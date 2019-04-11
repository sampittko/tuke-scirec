import React from 'react';
import propTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";
import Detail from "./detail";
import Review from "../projectVersionReview";
import './index.scss';
import {connect} from "react-redux";
import {timeouts} from "../../config/mui";
import Fade from "@material-ui/core/Fade";
import {getProjectsListRoute, getProjectVersionDocumentTitle} from "../../utils/projectUtils";
import {resetProjectVersionReviewState} from "../../store/actions/projectVersionReviewActions";

class ProjectVersion extends React.Component {
  componentDidMount() {
    if (this.props.activeDashboard && this.props.activeProject && this.props.activeProjectVersion) {
      document.title = getProjectVersionDocumentTitle(this.props.activeDashboard, this.props.activeProject, this.props.activeProjectVersion);
    }
  }

  render() {
    return (
      <Fade in timeout={timeouts.FADE_IN}>
        <div className={`project-version ${this.props.latest ? "latest" : ""}`}>
          {!this.props.latest && this.props.activeProjectVersion && (
            <Grid container>
              <Grid item>
                <Typography variant="h5" className="page-title">
                  Verzia {this.props.activeProjectVersion.data().versionNum} projektu <span
                  className="text-bolder">{this.props.activeProject.data().title}</span>
                </Typography>
              </Grid>
            </Grid>
          )}
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Detail latest={this.props.latest}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Review latest={this.props.latest}/>
            </Grid>
          </Grid>
        </div>
      </Fade>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.activeProjectVersion && !this.props.activeProjectVersion) {
      this.props.history.push(getProjectsListRoute(this.props.activeDashboard.data().route, this.props.activeProject.data().route));
    }
  }
}

ProjectVersion.propTypes = {
  latest: propTypes.bool,
  activeProject: propTypes.object,
  activeProjectVersion: propTypes.object,
  history: propTypes.object.isRequired,
  resetProjectVersionReviewState: propTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    resetProjectVersionReviewState: () => dispatch(resetProjectVersionReviewState()),
  }
};

const mapStateToProps = state => {
  return {
    activeProject: state.project.data.active,
    activeDashboard: state.dashboard.selector.active,
    activeProjectVersion: state.projectVersion.data.active,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectVersion);