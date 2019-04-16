import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import {dashboardConfig, projectConfig} from '../../config/app';

import DialogTransition from '../common/DialogTransition';
import React from 'react';
import {addProject} from '../../store/actions/projectActions';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {getNewProjectDialogDocumentTitle} from "../../utils/projectUtils";
import {getDashboardDocumentTitle} from "../../utils/dashboardUtils";
import StringInput from "../common/StringInput";

class NewProjectDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
  }

  handleChange = event => {
    this.setState({
      title: event.target.value
    });
  };

  handleClick = () => {
    this.setState({
      title: ''
    });
    this.props.onClick();
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addProject(this.state.title);
    this.handleClick();
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        TransitionComponent={DialogTransition}
      >
        <form onSubmit={this.handleSubmit}>
          <DialogTitle>Vytvorenie nového projektu</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Pre vytvorenie nového projektu zadajte nižšie jeho názov pričom jeho dĺžka musí byť
              od {projectConfig.MIN_LENGTH} do {projectConfig.MAX_LENGTH} znakov.
            </DialogContentText>
            <StringInput
              required
              onChange={this.handleChange}
              label="Názov projektu"
              value={this.state.title}
              maxLength={projectConfig.MAX_LENGTH}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClick}
              color="primary"
              type="button"
            >
              Zrušiť
            </Button>
            <Button
              type="submit"
              color="secondary"
              disabled={this.state.title.length < dashboardConfig.MIN_LENGTH}
            >
              Vytvoriť
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.open && this.props.open) {
      document.title = getNewProjectDialogDocumentTitle(this.props.activeDashboard);
    }
    else if (prevProps.open && !this.props.open) {
      document.title = getDashboardDocumentTitle(this.props.activeDashboard);
    }
  }
}

NewProjectDialog.propTypes = {
  addProject: propTypes.func.isRequired,
  open: propTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    addProject: title => dispatch(addProject(title))
  }
};

const mapStateToProps = state => {
  return {
    activeDashboard: state.dashboard.selector.active,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectDialog);