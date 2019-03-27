import propTypes from 'prop-types';
import React from "react";
import Typography from "@material-ui/core/Typography";
import FileUpload from "../../common/FileUpload";
import {Paper} from "@material-ui/core";
import './index.scss';

class Detail extends React.Component {
  render() {
    return (
      <div className="detail">
        <Typography variant={this.props.current ? "body1" : "h6"} className="page-title">Detail</Typography>
        <Paper className="paper">
          <Typography>Súbory</Typography>
          <FileUpload/>
        </Paper>
      </div>
    )
  }
}

Detail.propTypes = {
  current: propTypes.bool,
};

export default Detail;