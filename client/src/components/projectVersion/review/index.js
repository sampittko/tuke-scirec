import propTypes from 'prop-types';
import React from "react";
import Typography from "@material-ui/core/Typography";

const Review = props =>
  <Typography variant={props.current ? "body1" : "h6"} className="page-title">Posudok</Typography>;

Review.propTypes = {
  current: propTypes.bool,
};

export default Review;