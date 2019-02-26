import React from 'react';
import propTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@material-ui/core';
import { invertColor } from '../../../store/actions/colorPickerActions';
import ColorPicker from './content/ColorPicker';
import NameInput from './content/NameInput';
import Switch from './content/Switch';
import { dashboardConfig } from '../../../config/app';
import { connect } from 'react-redux';
import './NewDashboardDialog.scss';

class NewDashboardDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      default: false,
      color: 0
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
            name={this.props.name}
            onChange={this.props.handleNameChange}
          />
          <ColorPicker
            selectedColor={this.state.color}
            onChange={this.handleColorChange}
          />
          <Switch
            checked={this.props.inverted}
            onChange={this.props.invertColor}
            label="Invertovať farby"
          />
          <Switch
            checked={this.state.default}
            onChange={this.handleDefaultChange}
            label="Nastaviť ako predvolenú nástenku"
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
            onClick={event => this.props.onClick(event, {
              ...this.state,
              inverted: this.props.inverted
            })}
            color="secondary"
            disabled={this.props.name.length < dashboardConfig.MIN_LENGTH || this.props.isDashboardLoading}
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
  isDashboardLoading: propTypes.bool.isRequired,
  inverted: propTypes.bool.isRequired,
  handleNameChange: propTypes.func.isRequired,
  name: propTypes.string.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    invertColor: () => dispatch(invertColor())
  }
}

const mapStateToProps = state => {
  return {
    isDashboardLoading: state.dashboard.isLoading,
    inverted: state.colorPicker.inverted
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDashboardDialog);