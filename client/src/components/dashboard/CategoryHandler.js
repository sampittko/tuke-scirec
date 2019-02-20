import React from 'react';
import { FormControl, Select, MenuItem, Dialog, DialogTitle, DialogContent, Input, DialogActions, Button, InputAdornment, DialogContentText, InputLabel, Checkbox, FormControlLabel } from '@material-ui/core';
import { category } from '../../config/app/';
import './CategoryHandler.scss';

class CategoryHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 1,
      newCategory: {
        name: '',
        isDefault: false
      },
    }
  }

  handleClose = () => {
    this.setState({
      selectedCategory: 1
    });
  }

  handleNewCategoryCreation = () => {
    
  }

  handleChange = event => {
    if (event.target.name === "newCategoryName") {
      if (this.state.newCategory.name.length === category.NAME_MAX_LENGTH && event.target.value.length > category.NAME_MAX_LENGTH) {
        return;
      }
      this.setState({
        newCategory: {
          name: event.target.value
        }
      });
    }
    else {
      this.setState({
        setAsDefault: this.state.setAsDefault
      });
    }
  }

  handleCategoryChange = event => {
    this.setState({
      selectedCategory: event.target.value
    });
  }

  render() {
    return (
      <div className="category-handler">
        <FormControl>
          <Select
            disableUnderline
            value={this.state.selectedCategory}
            onChange={this.handleCategoryChange}
          >
            <MenuItem value={1}>Predvolená kategória</MenuItem>
            <MenuItem value={0}>Nová kategória</MenuItem>
          </Select>
        </FormControl>
        <Dialog open={this.state.selectedCategory === 0}>
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
                name="newCategoryName"
                value={this.state.newCategory.name}
                margin="dense"
                endAdornment={<InputAdornment position="end">{this.state.newCategory.name.length}/20</InputAdornment>}
                type="text"
                fullWidth
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.setAsDefault}
                  onChange={this.handleChange}
                  value={this.state.setAsDefault ? "true" : "false"}
                  name="setAsDefault"
                  color="primary"
                />
              }
              label="Nastavit ako predvolenú kategóriu"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              color="primary"
            >
              Zrušiť
            </Button>
            <Button
              onClick={this.handleNewCategoryCreation}
              color="secondary"
              disabled={this.state.newCategory.name.length < category.NAME_MIN_LENGTH}
            >
              Vytvoriť
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CategoryHandler;