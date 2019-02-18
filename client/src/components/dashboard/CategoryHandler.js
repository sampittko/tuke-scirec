import React from 'react';
import { FormControl, Select, MenuItem, Dialog, DialogTitle, DialogContent, Input, DialogActions, Button, InputAdornment, DialogContentText, InputLabel, Checkbox, FormControlLabel } from '@material-ui/core';
import './CategoryHandler.scss';

const MAX_CATEGORIES = 5;
const CATEGORY_MIN_LENGTH = 3;
const CATEGORY_MAX_LENGTH = 20;
const NEW_CATEGORY_ID = 0;
const DEFAULT_CATEGORY_ID = 1;

class CategorySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: DEFAULT_CATEGORY_ID,
      newCategoryName: '',
      setAsDefault: false
    }
  }

  handleDialogClose = () => {
    this.setState({
      category: DEFAULT_CATEGORY_ID
    });
  }

  handleNewCategoryCreation = () => {
    
  }

  handleChange = event => {
    if (event.target.name === "newCategoryName" && this.state.newCategoryName.length === CATEGORY_MAX_LENGTH && event.target.value.length > CATEGORY_MAX_LENGTH) {
      return;
    }
    if (event.target.name === "newCategoryName") {
      this.setState({
        [event.target.name]: event.target.value
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
      category: event.target.value
    });
  }

  render() {
    return (
      <div className="category-handler">
        <FormControl>
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
              Pre vytvorenie novej kategórie zadajte nižšie jej názov pričom jeho dĺžka musí byť od {CATEGORY_MIN_LENGTH} do {CATEGORY_MAX_LENGTH} znakov. Maximálny počet kategórií je {MAX_CATEGORIES}.
            </DialogContentText>
            <FormControl>
              <InputLabel>
                Názov kategórie
              </InputLabel>
              <Input
                autoFocus
                name="newCategoryName"
                value={this.state.newCategoryName}
                margin="dense"
                endAdornment={<InputAdornment position="end">{this.state.newCategoryName.length}/20</InputAdornment>}
                type="text"
                fullWidth
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleChange}
                  name="setAsDefault"
                  value={this.state.setAsDefault}
                  color="primary"
                />
              }
              label="Nastavit ako predvolenú kategóriu"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleDialogClose}
              color="primary"
            >
              Zrušiť
            </Button>
            <Button
              onClick={this.handleNewCategoryCreation}
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