import {FormControl, Input, InputAdornment, InputLabel} from '@material-ui/core';
import './StringInput.scss';
import React from 'react';
import propTypes from 'prop-types';

class StringInput extends React.Component {
  handleChange = event => {
    if (event.target.value.length <= this.props.maxLength) {
      this.props.onChange(event);
    }
  };

  render() {
    return (
      <FormControl className={`string-input ${this.props.multiline ? "multiline" : ""}`}>
        <InputLabel>
          {this.props.label}
        </InputLabel>
        <Input
          autoFocus
          name={this.props.name}
          required={this.props.required}
          value={this.props.value}
          endAdornment={(
            <InputAdornment
              position="end"
              className={`adornment ${this.props.multiline ? "multiline" : ""}`}
            >
              {this.props.value.length}/{this.props.maxLength}
            </InputAdornment>
          )}
          type="text"
          fullWidth
          onChange={this.handleChange}
          multiline={this.props.multiline}
          rows={this.props.rows}
          rowsMax={this.props.rowsMax}
        />
      </FormControl>
    );
  }
}

StringInput.propTypes = {
  label: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  maxLength: propTypes.number.isRequired,
  name: propTypes.string,
  value: propTypes.string.isRequired,
  multiline: propTypes.bool,
  rows: propTypes.number,
  rowsMax: propTypes.number,
};

export default StringInput;