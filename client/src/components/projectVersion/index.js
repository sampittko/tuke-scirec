import React from 'react';
import propTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";
import Detail from "./detail";
import Review from "./reviews";
import './index.scss';
import {connect} from "react-redux";
import {addProjectVersion} from '../../store/actions/projectVersionActions';

class ProjectVersion extends React.Component {
  render() {
    return (
      <div className="project-version">
        {!this.props.latest && (
          <Grid container>
            <Grid item>
              <Typography variant="h5" className="page-title">
                Verzia <span className="text-bolder">{this.props.activeProject.data().versionsCount}</span>
              </Typography>
            </Grid>
          </Grid>
        )}
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Detail latest={this.props.latest}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Review latest={this.props.latest}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ProjectVersion.propTypes = {
  latest: propTypes.bool,
  activeProject: propTypes.object.isRequired,
  addProjectVersion: propTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    addProjectVersion: () => dispatch(addProjectVersion()),
  }
};

const mapStateToProps = state => {
  return {
    activeProject: state.project.data.active,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectVersion);