import React from 'react';
import propTypes from 'prop-types';
import {Paper} from "@material-ui/core";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";

class Version extends React.Component {
  render() {
    return (
      <div>
        <Typography
          variant="h6"
          className="page-title"
        >
          Najnovšia verzia
        </Typography>
        <Paper className="paper">

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