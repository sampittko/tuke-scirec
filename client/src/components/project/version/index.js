import React from 'react';
import propTypes from 'prop-types';
import {Paper} from "@material-ui/core";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import './index.scss';
import FileUpload from "../../common/FileUpload";

class Version extends React.Component {
  render() {
    return (
      <div className="version">
        <Typography variant="h6" className="page-title">
          Najnovšia verzia
        </Typography>
        <Paper className="paper">
          <FileUpload/>
        </Paper>
      </div>
    );
  }
}

Version.propTypes = {
  activeProject: propTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    activeProject: state.project.data.active,
  }
};

export default connect(mapStateToProps)(Version);