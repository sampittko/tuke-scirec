import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { pickTheme } from '../../../../../store/actions/themePickerActions';
import { Radio, FormControl, FormControlLabel } from '@material-ui/core';
import './ThemePicker.scss';

const ThemePicker = props =>
  <FormControl>
    <FormControlLabel
      control={
        <div>
          <Radio
            className="scirec-theme"
            checked={props.selectedTheme === 0}
            onChange={props.onChange}
            onClick={() => props.pickTheme(0)}
            value={0}
          />
          <Radio
            className="scirec-custom-theme-1"
            checked={props.selectedTheme === 1}
            onChange={props.onChange}
            onClick={() => props.pickTheme(1)}
            value={1}
          />
          <Radio
            className="scirec-custom-theme-2"
            checked={props.selectedTheme === 2}
            onChange={props.onChange}
            onClick={() => props.pickTheme(2)}
            value={2}
          />
          <Radio
            className="scirec-custom-theme-3"
            checked={props.selectedTheme === 3}
            onChange={props.onChange}
            onClick={() => props.pickTheme(3)}
            value={3}
          />
          <Radio
            className="scirec-custom-theme-4"
            checked={props.selectedTheme === 4}
            onChange={props.onChange}
            onClick={() => props.pickTheme(4)}
            value={4}
          />
          <Radio
            className="scirec-custom-theme-5"
            checked={props.selectedTheme === 5}
            onChange={props.onChange}
            onClick={() => props.pickTheme(5)}
            value={5}
          />
          <Radio
            className="scirec-custom-theme-6"
            checked={props.selectedTheme === 6}
            onChange={props.onChange}
            onClick={() => props.pickTheme(6)}
            value={6}
          />
        </div>
      }
      label="Farba nástenky"
      labelPlacement="start"
    />
  </FormControl>;

ThemePicker.propTypes = {
  selectedTheme: propTypes.number.isRequired,
  onChange: propTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    pickTheme: theme => dispatch(pickTheme(theme))
  }
}

export default connect(null, mapDispatchToProps)(ThemePicker);