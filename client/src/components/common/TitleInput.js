import {FormControl, Input, InputAdornment, InputLabel} from '@material-ui/core';

import React from 'react';
import propTypes from 'prop-types';

const TitleInput = props =>
  <FormControl>
    <InputLabel>
      {props.label}
    </InputLabel>
    <Input
      autoFocus
      name={props.name}
      required={props.required}
      value={props.title}
      endAdornment={<InputAdornment position="end">{props.title.length}/{props.maxTitleLength}</InputAdornment>}
      type="text"
      fullWidth
      onChange={props.onChange}
    />
  </FormControl>;

TitleInput.propTypes = {
  label: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  maxTitleLength: propTypes.number.isRequired,
  name: propTypes.string,
  title: propTypes.string.isRequired,
};

export default TitleInput;