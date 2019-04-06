import React from 'react';
import './Add.scss';
import {addProjectVersionReview} from "../../store/actions/projectVersionReviewActions";
import {connect} from "react-redux";
import propTypes from 'prop-types';
import Button from "@material-ui/core/Button";

const Add = props =>
  <div className="add-project-version-review">
    <Button
      size="small"
      onClick={() => props.addProjectVersionReview()}
    >
      Pridať posudok
    </Button>
  </div>;

Add.propTypes = {
  addProjectVersionReview: propTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    addProjectVersionReview: () => dispatch(addProjectVersionReview()),
  }
};

export default connect(null, mapDispatchToProps)(Add);