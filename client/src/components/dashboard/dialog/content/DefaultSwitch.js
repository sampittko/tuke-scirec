import React from 'react';
import propTypes from 'prop-types';
import { FormControl, FormControlLabel, Switch } from '@material-ui/core';

const DefaultSwitch = props =>
  <FormControl>
    <FormControlLabel
      control={
        <Switch
          checked={Boolean(props.default)}
          onChange={props.onChange}
          value={props.default ? "true" : "false"}
          color="primary"
        />
      }
      labelPlacement="start"
      label="Nastaviť ako predvolenú nástenku"
    />
  </FormControl>;

DefaultSwitch.propTypes = {
  default: propTypes.bool.isRequired,
  onChange: propTypes.func.isRequired
}

export default DefaultSwitch;