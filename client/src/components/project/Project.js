import { Fade } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { getProject } from '../../store/actions/projectActions';
import { getProjectDocumentTitle } from '../../utils/projectUtils';
import propTypes from 'prop-types';
import { timeouts } from '../../config/mui';
import { withRouter } from 'react-router';

class Project extends React.Component {
  componentDidMount() {
    this.props.getProject();
  }

  render() {
    return (
      <Fade in timeout={timeouts.FADE_IN}>
        <div className="project">
          Projekt
        </div>
      </Fade>
    );
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.project !== prevProps.project) {
      getProjectDocumentTitle(this.props.activeDashboard, this.props.project);
    }
  }
}

Project.propTypes = {
  activeDashboard: propTypes.object,
  project: propTypes.object
}

const mapDispatchToProps = dispatch => {
  return {
    getProject: () => dispatch(getProject())
  }
}

const mapStateToProps = state => {
  return {
    activeDashboard: state.dashboard.selector.active,
    project: state.project.data.active,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Project));