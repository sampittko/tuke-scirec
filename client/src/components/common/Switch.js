import {FormControl, FormControlLabel, Switch} from '@material-ui/core';

import React from 'react';
import propTypes from 'prop-types';

const SwitchComponent = props =>
  <FormControl>
    <FormControlLabel
      control={
        <Switch
          name={props.name}
          checked={Boolean(props.checked)}
          onChange={props.onChange}
          value={props.checked ? "true" : "false"}
          color="primary"
        />
      }
      labelPlacement="start"
      label={props.label}
    />
  </FormControl>;

SwitchComponent.propTypes = {
  checked: propTypes.bool.isRequired,
  onChange: propTypes.func.isRequired,
  label: propTypes.string.isRequired,
  name: propTypes.string
};

export default SwitchComponent;