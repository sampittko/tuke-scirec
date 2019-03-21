import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import {dashboardConfig, projectConfig} from '../../config/app';

import DialogTransition from '../common/DialogTransition';
import React from 'react';
import TitleInput from '../common/TitleInput';
import {addProject} from '../../store/actions/projectActions';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

class NewProjectDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
  }

  handleChange = event => {
    if (this.state.title.length !== projectConfig.MAX_LENGTH || event.target.value.length < projectConfig.MAX_LENGTH) {
      this.setState({
        title: event.target.value
      });
    }
  };

  handleClick = (event, title) => {
    if (title) {
      this.props.addProject(title);
    }
    this.setState({
      title: ''
    });
    this.props.onClick();
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        TransitionComponent={DialogTransition}
      >
        <DialogTitle>Vytvorenie nového projektu</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pre vytvorenie nového projektu zadajte nižšie jeho názov pričom jeho dĺžka musí byť
            od {projectConfig.MIN_LENGTH} do {projectConfig.MAX_LENGTH} znakov.
          </DialogContentText>
          <TitleInput
            required
            onChange={this.handleChange}
            maxTitleLength={projectConfig.MAX_LENGTH}
            label="Názov projektu"
            title={this.state.title}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleClick}
            color="primary"
          >
            Zrušiť
          </Button>
          <Button
            onClick={(event) => this.handleClick(event, this.state.title)}
            color="secondary"
            disabled={this.state.title.length < dashboardConfig.MIN_LENGTH}
          >
            Vytvoriť
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

NewProjectDialog.propTypes = {
  addProject: propTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    addProject: title => dispatch(addProject(title))
  }
};

export default connect(null, mapDispatchToProps)(NewProjectDialog);