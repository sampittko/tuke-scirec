import propTypes from 'prop-types';
import React from "react";
import Typography from "@material-ui/core/Typography";
import FileUpload from "../../common/FileUpload";
import {Paper} from "@material-ui/core";

const Detail = props =>
  <div>
    <Typography variant={props.current ? "body1" : "h6"} className="page-title">Detail</Typography>
    <Paper>
      <FileUpload/>
    </Paper>
  </div>;

Detail.propTypes = {
  current: propTypes.bool,
};

export default Detail;