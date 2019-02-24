import React from 'react';
import propTypes from 'prop-types';
import { Radio, FormControl, FormControlLabel } from '@material-ui/core';

const ColorPicker = props =>
  <FormControl>
    <FormControlLabel
      control={
        <div>
          <Radio
            color="primary"
            checked={props.selectedColor === 0}
            onChange={props.onChange}
            value={0}
          />
          <Radio
            checked={props.selectedColor === 1}
            onChange={props.onChange}
            value={1}
          />
        </div>
      }
      label="Farba nástenky"
      labelPlacement="start"
    />
  </FormControl>;

ColorPicker.propTypes = {
  selectedColor: propTypes.number.isRequired,
  onChange: propTypes.func.isRequired
}

export default ColorPicker;