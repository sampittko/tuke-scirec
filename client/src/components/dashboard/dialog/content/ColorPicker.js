import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { pickColor } from '../../../../store/actions/colorPickerActions';
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
          <Radio
            className="scirec-custom-theme-2"
            checked={props.selectedColor === 2}
            onChange={props.onChange}
            onClick={() => props.pickColor(2)}
            value={2}
          />
          <Radio
            className="scirec-custom-theme-3"
            checked={props.selectedColor === 3}
            onChange={props.onChange}
            onClick={() => props.pickColor(3)}
            value={3}
          />
          <Radio
            className="scirec-custom-theme-4"
            checked={props.selectedColor === 4}
            onChange={props.onChange}
            onClick={() => props.pickColor(4)}
            value={4}
          />
          <Radio
            className="scirec-custom-theme-5"
            checked={props.selectedColor === 5}
            onChange={props.onChange}
            onClick={() => props.pickColor(5)}
            value={5}
          />
          <Radio
            className="scirec-custom-theme-6"
            checked={props.selectedColor === 6}
            onChange={props.onChange}
            onClick={() => props.pickColor(6)}
            value={6}
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