import propTypes from 'prop-types';
import React from "react";
import Typography from "@material-ui/core/Typography";

const Overview = props =>
  <Typography variant={props.current ? "body1" : "h6"} className="page-title">Prehľad</Typography>;

Overview.propTypes = {
  current: propTypes.bool,
};

export default Overview;