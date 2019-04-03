import propTypes from 'prop-types';
import React from "react";
import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";
import './index.scss';
import {connect} from "react-redux";
import Loader from "../../common/Loader";
import List from "./list";
import Add from "./Add";

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedPanel: 0,
    }
  }

  handleChange = (event, panel) => {
    this.setState({
      expandedPanel: this.state.expandedPanel === panel ? 0 : panel
    });
  };

  render() {
    return (
      <div className={`project-version-review ${this.props.latest ? "latest" : ""}`}>
        <Typography variant={this.props.latest ? "body1" : "h6"} className="page-title">Posudky</Typography>
        <Paper className="paper">
          {!this.props.isReviewLoading ? (
            <div>
              <List
                onChange={(event, panel) => this.handleChange(event, panel)}
                expandedPanel={this.state.expandedPanel}
              />
              <Add/>
            </div>
          ) : (
            <Loader/>
          )}
        </Paper>
      </div>
    );
  }
}

Review.propTypes = {
  latest: propTypes.bool,
  // TODO add prop-type from projectVersionReviewsPropTypes
  isReviewLoading: propTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    // TODO map to projectVersionReviews reducer
    isReviewLoading: false,
  }
};

export default connect(mapStateToProps)(Review);