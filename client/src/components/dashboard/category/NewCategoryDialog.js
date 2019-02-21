import React from 'react';
import { FormControl, Dialog, DialogTitle, DialogContent, Input, DialogActions, Button, InputAdornment, DialogContentText, InputLabel, Checkbox, FormControlLabel } from '@material-ui/core';
import { category } from '../../../config/app';
import './NewCategoryDialog.scss';

class NewCategoryDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      default: false
    }
  }

  handleNameChange = event => {
    if (this.state.name.length !== category.NAME_MAX_LENGTH || event.target.value.length < category.NAME_MAX_LENGTH) {
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

  handleCategoryCreation = () => {

  }

  render() {
    return (
      <Dialog open={this.props.open}>
        <DialogTitle>Vytvorenie novej kategórie</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pre vytvorenie novej kategórie zadajte nižšie jej názov pričom jeho dĺžka musí byť od {category.NAME_MIN_LENGTH} do {category.NAME_MAX_LENGTH} znakov. Maximálny počet kategórií je {category.COUNT_MAX_LIMIT}.
          </DialogContentText>
          <FormControl>
            <InputLabel>
              Názov kategórie
            </InputLabel>
            <Input
              autoFocus
              value={this.state.name}
              margin="dense"
              endAdornment={<InputAdornment position="end">{this.state.name.length}/{category.NAME_MAX_LENGTH}</InputAdornment>}
              type="text"
              fullWidth
              onChange={this.handleNameChange}
            />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(this.state.default)}
                onChange={this.handleDefaultChange}
                value={this.state.default ? "true" : "false"}
                color="primary"
              />
            }
            label="Nastaviť ako predvolenú kategóriu"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.onClick}
            color="primary"
          >
            Zrušiť
          </Button>
          <Button
            onClick={this.handleCategoryCreation}
            color="secondary"
            disabled={this.state.name.length < category.NAME_MIN_LENGTH}
          >
            Vytvoriť
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default NewCategoryDialog;