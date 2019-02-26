import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { pickColor } from '../../../../store/actions/dashboardActions';
import { Radio, FormControl, FormControlLabel } from '@material-ui/core';
import './ColorPicker.scss';

const ColorPicker = props =>
  <FormControl>
    <FormControlLabel
      control={
        <div>
          <Radio
            className="scirec-theme"
            checked={props.selectedColor === 0}
            onChange={props.onChange}
            onClick={() => props.pickColor(0)}
            value={0}
          />
          <Radio
            className="scirec-custom-theme-1"
            checked={props.selectedColor === 1}
            onChange={props.onChange}
            onClick={() => props.pickColor(1)}
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

const mapDispatchToProps = dispatch => {
  return {
    pickColor: color => dispatch(pickColor(color))
  }
}

export default connect(null, mapDispatchToProps)(ColorPicker);