import React from 'react';
import propTypes from 'prop-types';
import { dashboardConfig } from '../../../../config/app';
import { FormControl, InputLabel, Input, InputAdornment } from '@material-ui/core';

const NameInput = props =>
  <FormControl>
    <InputLabel>
      Názov nástenky
    </InputLabel>
    <Input
      autoFocus
      value={props.name}
      endAdornment={<InputAdornment position="end">{props.name.length}/{dashboardConfig.MAX_LENGTH}</InputAdornment>}
      type="text"
      fullWidth
      onChange={props.onChange}
    />
  </FormControl>;

NameInput.propTypes = {
  onChange: propTypes.func.isRequired,
  name: propTypes.string.isRequired
}

export default NameInput;