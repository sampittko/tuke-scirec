import propTypes from 'prop-types';
import React from "react";
import Typography from "@material-ui/core/Typography/index";
import {Paper} from "@material-ui/core";
import './index.scss';
import {connect} from "react-redux";
import Loader from "../common/Loader";
import List from "./list";
import Add from "./Add";
import projectVersionReviewPropTypes from '../../propTypes/projectVersionReviewPropTypes';
import projectVersionPropTypes from '../../propTypes/projectVersionReviewPropTypes';
import {
  getProjectVersionReviews,
  resetProjectVersionReviewState
} from "../../store/actions/projectVersionReviewActions";

class ProjectVersionReview extends React.Component {
  componentDidMount() {
    if (this.props.activeProjectVersion) {
      this.props.getProjectVersionReviews();
    }
  }

  render() {
    return (
      <div className={`project-version-review ${this.props.latest ? "latest" : ""}`}>
        <Typography variant={this.props.latest ? "body1" : "h6"} className="page-title">Posudky</Typography>
        <Paper className="paper">
          {this.props.activeProjectVersion && !this.props.isProjectVersionReviewLoading && !this.props.isProjectVersionLoading ? (
            <div>
              <List/>
              <Add/>
            </div>
          ) : (
            <Loader/>
          )}
        </Paper>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.activeProjectVersion !== this.props.activeProjectVersion && this.props.activeProjectVersion) {
      this.props.getProjectVersionReviews();
    }
  }
}

ProjectVersionReview.propTypes = {
  latest: propTypes.bool,
  isProjectVersionReviewLoading: projectVersionReviewPropTypes.isLoading.isRequired,
  isProjectVersionLoading: projectVersionPropTypes.isLoading.isRequired,
  activeProjectVersion: propTypes.object,
  getProjectVersionReviews: propTypes.func.isRequired,
  resetProjectVersionReviewState: propTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    getProjectVersionReviews: () => dispatch(getProjectVersionReviews()),
    resetProjectVersionReviewState: () => dispatch(resetProjectVersionReviewState()),
  }
};

const mapStateToProps = state => {
  return {
    isProjectVersionReviewLoading: state.projectVersionReview.isLoading,
    isProjectVersionLoading: state.projectVersion.isLoading,
    activeProjectVersion: state.projectVersion.data.active,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectVersionReview);