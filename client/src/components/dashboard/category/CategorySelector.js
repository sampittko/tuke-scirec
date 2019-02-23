import React from 'react';
import propTypes from 'prop-types';
import userPropTypes from '../../../propTypes/userPropTypes';
import dashboardPropTypes from '../../../propTypes/dashboardPropTypes';
import { getCategories } from '../../../store/actions/dashboardActions';
import { category } from '../../../config/app/';
import { connect } from 'react-redux';
import { createCategory } from '../../../store/actions/dashboardActions';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import NewCategoryDialog from './NewCategoryDialog';
import './CategorySelector.scss';

class CategorySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 0
    }
  }

  componentDidMount() {
    this.props.getCategories(this.props.user.id);
  }

  handleClick = () => {
    this.setState({
      selectedCategory: 0
    });
  }

  handleChange = event => {
    this.setState({
      selectedCategory: event.target.value
    });
  }

  createCategory = newCategory => {
    this.handleClick();
    this.props.createCategory(newCategory);
    this.props.getCategories(this.props.user.id);
  }

  render() {
    return (
      <div>
        {this.props.categories && !this.props.isLoading && (
          <div className="category-handler">
              <FormControl>
                <Select
                  disableUnderline
                  value={this.state.selectedCategory}
                  onChange={this.handleChange}
                >
                  {this.props.categories.map((category, i) =>
                    <MenuItem key={i} value={i}>
                      {category.name}
                    </MenuItem>
                  )}
                  <MenuItem 
                    value={category.MAX_COUNT}
                    disabled={this.props.categories.length === category.MAX_COUNT}
                  >
                    Nová kategória
                  </MenuItem>
                </Select>
              </FormControl>
            <NewCategoryDialog
              open={this.state.selectedCategory === category.MAX_COUNT}
              createCategory={newCategory => this.createCategory(newCategory)}
              onClick={this.handleClick}
            />
          </div>
        )}
      </div>
    )
  }
}

CategorySelector.propTypes = {
  getCategories: propTypes.func.isRequired,
  user: userPropTypes.user.isRequired,
  categories: propTypes.array,
  isLoading: propTypes.bool.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    createCategory: newCategory => dispatch(createCategory(newCategory)),
    getCategories: userId => dispatch(getCategories(userId))
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data,
    categories: state.dashboard.data.categories,
    isLoading: state.dashboard.isLoading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelector);