import React from 'react';
import propTypes from 'prop-types';
import { dashboardConfig } from '../../../../config/app';
import { FormControl, InputLabel, Input, InputAdornment } from '@material-ui/core';

const TitleInput = props =>
  <FormControl>
    <InputLabel>
      Názov nástenky
    </InputLabel>
    <Input
      autoFocus
      value={props.title}
      endAdornment={<InputAdornment position="end">{props.title.length}/{dashboardConfig.MAX_LENGTH}</InputAdornment>}
      type="text"
      fullWidth
      onChange={props.onChange}
    />
  </FormControl>;

TitleInput.propTypes = {
  onChange: propTypes.func.isRequired,
  title: propTypes.string.isRequired
}

export default TitleInput;