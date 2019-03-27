import propTypes from 'prop-types';
import React from "react";
import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";

const Review = props =>
  <div className="review">
    <Typography variant={props.current ? "body1" : "h6"} className="page-title">Posudok</Typography>
    <Paper className="paper">
      Ja som vlastne tu
    </Paper>
  </div>;

Review.propTypes = {
  current: propTypes.bool,
};

export default Review;