import { FormControl, Input, InputAdornment, InputLabel } from '@material-ui/core';

import React from 'react';
import { dashboardConfig } from '../../../config/app';
import propTypes from 'prop-types';

const NewDashboardTitleInput = props =>
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

NewDashboardTitleInput.propTypes = {
  onChange: propTypes.func.isRequired,
  title: propTypes.string.isRequired
}

export default NewDashboardTitleInput;