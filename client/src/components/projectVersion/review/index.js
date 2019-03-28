import propTypes from 'prop-types';
import React from "react";
import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";
import './index.scss';
import File from "../file";

const Review = props =>
  <div className="review">
    <Typography variant={props.latest ? "body1" : "h6"} className="page-title">Posudok</Typography>
    <Paper className="paper">
      <File/>
    </Paper>
  </div>;

Review.propTypes = {
  latest: propTypes.bool,
};

export default Review;