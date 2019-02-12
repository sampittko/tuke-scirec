import React from 'react';
import { FormControl, Select, MenuItem, Dialog, DialogTitle, DialogContent, Input, DialogActions, Button, InputAdornment, DialogContentText, InputLabel } from '@material-ui/core';
import './CategoryHandler.scss';

const CATEGORY_MIN_LENGTH = 3;
const CATEGORY_MAX_LENGTH = 20;
const NEW_CATEGORY_ID = 0;
const DEFAULT_CATEGORY_ID = 1;

class CategorySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: DEFAULT_CATEGORY_ID,
      newCategoryName: ''
    }
  }

  handleDialogClose = () => {
    this.setState({
        category: DEFAULT_CATEGORY_ID
    });
  }

  handleInputChange = event => {
    console.log(event.target.value);
    if (this.state.newCategoryName.length === CATEGORY_MAX_LENGTH && event.target.value.length > CATEGORY_MAX_LENGTH) {
      return;
    }
    this.setState({
      newCategoryName: event.target.value
    });
  }

  handleCategoryChange = event => {
    this.setState({
      category: event.target.value
    });
  }

  render() {
    return (
      <div>
        <FormControl className="category-handler">
          <Select
            disableUnderline
            value={this.state.category}
            onChange={this.handleCategoryChange}
          >
            <MenuItem value={DEFAULT_CATEGORY_ID}>Predvolená kategória</MenuItem>
            <MenuItem value={NEW_CATEGORY_ID}>Nová kategória</MenuItem>
          </Select>
        </FormControl>
        <Dialog open={this.state.category === NEW_CATEGORY_ID}>
          <DialogTitle>Vytvorenie novej kategórie</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Pre vytvorenie novej kategórie zadajte nižšie jej názov pričom jeho dĺžka musí byť od {CATEGORY_MIN_LENGTH} do {CATEGORY_MAX_LENGTH} znakov.
            </DialogContentText>
            <FormControl>
              <InputLabel>
                Názov kategórie
              </InputLabel>
              <Input
                autoFocus
                value={this.state.newCategoryName}
                margin="dense"
                label="Názov kategórie"
                endAdornment={<InputAdornment position="end">{this.state.newCategoryName.length}/20</InputAdornment>}
                type="text"
                fullWidth
                onChange={this.handleInputChange}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleDialogClose}
              color="primary">
              Zrušiť
            </Button>
            <Button
              onClick={this.handleNewCategorySave}
              color="secondary"
              disabled={this.state.newCategoryName.length < CATEGORY_MIN_LENGTH}
              >
              Vytvoriť
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CategorySelector;