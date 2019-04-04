import React from 'react';
import {IconButton, Tooltip} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './Add.scss';
import {addProjectVersionReview} from "../../store/actions/projectVersionReviewActions";
import {connect} from "react-redux";
import propTypes from 'prop-types';

const Add = props =>
  <div className="add-project-version-review">
    <Tooltip title="Pridať nový posudok" placement="bottom">
      <IconButton onClick={() => props.addProjectVersionReview()}>
        <AddCircleOutlineIcon fontSize="large"/>
      </IconButton>
    </Tooltip>
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