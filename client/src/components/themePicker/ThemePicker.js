import './ThemePicker.scss';

import { FormControl, FormControlLabel, Radio } from '@material-ui/core';
import { invertTheme, pickTheme } from '../../store/actions/themePickerActions';

import React from 'react';
import Switch from '../common/Switch';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import themePickerPropTypes from '../../propTypes/themePickerPropTypes';

const ThemePicker = props =>
  <div>
    <FormControl>
      <FormControlLabel
        control={
          <div>
            <Radio
              className="scirec-theme"
              checked={props.themePicker.theme === 0}
              onClick={() => props.pickTheme(0)}
              value={0}
            />
            <Radio
              className="custom-theme-1"
              checked={props.themePicker.theme === 1}
              onClick={() => props.pickTheme(1)}
              value={1}
            />
            <Radio
              className="custom-theme-2"
              checked={props.themePicker.theme === 2}
              onClick={() => props.pickTheme(2)}
              value={2}
            />
            <Radio
              className="custom-theme-3"
              checked={props.themePicker.theme === 3}
              onClick={() => props.pickTheme(3)}
              value={3}
            />
            <Radio
              className="custom-theme-4"
              checked={props.themePicker.theme === 4}
              onClick={() => props.pickTheme(4)}
              value={4}
            />
            <Radio
              className="custom-theme-5"
              checked={props.themePicker.theme === 5}
              onClick={() => props.pickTheme(5)}
              value={5}
            />
            <Radio
              className="custom-theme-6"
              checked={props.themePicker.theme === 6}
              onClick={() => props.pickTheme(6)}
              value={6}
            />
          </div>
        }
        label="Farba nástenky"
        labelPlacement="start"
      />
    </FormControl>
    <Switch
      checked={props.themePicker.inverted}
      onChange={props.invertTheme}
      label="Invertovať farby"
    />
  </div>;

ThemePicker.propTypes = {
  themePicker: themePickerPropTypes.themePicker.isRequired,
  pickTheme: propTypes.func.isRequired,
  invertTheme: propTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => {
  return {
    pickTheme: theme => dispatch(pickTheme(theme)),
    invertTheme: () => dispatch(invertTheme()),
  }
}

const mapStateToProps = state => {
  return {
    themePicker: state.themePicker
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemePicker);