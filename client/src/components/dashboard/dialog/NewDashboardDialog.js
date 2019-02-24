import React from 'react';
import propTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@material-ui/core';
import ColorPicker from './content/ColorPicker';
import NameInput from './content/NameInput';
import DefaultSwitch from './content/DefaultSwitch';
import { dashboardConfig } from '../../../config/app';
import { connect } from 'react-redux';
import './NewDashboardDialog.scss';

class NewDashboardDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      default: false,
      color: 0
    }
  }

  handleNameChange = event => {
    if (this.state.name.length !== dashboardConfig.MAX_LENGTH || event.target.value.length < dashboardConfig.MAX_LENGTH) {
      this.setState({
        name: event.target.value
      });
    }
  }

  handleDefaultChange = () => {
    this.setState({
      default: !this.state.default
    });
  }

  handleColorChange = event => {
    this.setState({
      color: Number(event.target.value)
    });
  }

  render() {
    return (
      <Dialog open={this.props.open}>
        <DialogTitle>Vytvorenie novej nástenky</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pre vytvorenie novej nástenky zadajte nižšie jej názov pričom jeho dĺžka musí byť od {dashboardConfig.MIN_LENGTH} do {dashboardConfig.MAX_LENGTH} znakov. Maximálny počet násteniek je {dashboardConfig.MAX_COUNT}.
          </DialogContentText>
          <NameInput
            name={this.state.name}
            onChange={this.handleNameChange}
          />
          <ColorPicker
            selectedColor={this.state.color}
            onChange={this.handleColorChange}
          />
          <DefaultSwitch
            default={this.state.default}
            onChange={this.handleDefaultChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.onClick}
            color="primary"
            disabled={this.props.isDashboardLoading}
          >
            Zrušiť
          </Button>
          <Button
            onClick={event => this.props.onClick(event, this.state)}
            color="secondary"
            disabled={this.state.name.length < dashboardConfig.MIN_LENGTH || this.props.isDashboardLoading}
          >
            Vytvoriť
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

NewDashboardDialog.propTypes = {
  open: propTypes.bool.isRequired,
  onClick: propTypes.func.isRequired,
  isDashboardLoading: propTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    isDashboardLoading: state.dashboard.isLoading
  }
}

export default connect(mapStateToProps)(NewDashboardDialog);