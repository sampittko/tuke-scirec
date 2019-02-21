import React from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import NewCategoryDialog from './NewCategoryDialog';
import './CategorySelector.scss';

class CategorySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 1
    }
  }

  handleClick = () => {
    this.setState({
      selectedCategory: 1
    });
  }

  handleChange = event => {
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
            onChange={this.handleChange}
          >
            <MenuItem value={1}>Predvolená kategória</MenuItem>
            <MenuItem value={0}>Nová kategória</MenuItem>
          </Select>
        </FormControl>
        <NewCategoryDialog
          open={this.state.selectedCategory === 0}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default CategorySelector;