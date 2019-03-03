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
              className={!props.themePicker.inverted ? "scirec-theme" : "scirec-theme inverted"}
              checked={props.themePicker.theme === 0}
              onClick={() => props.pickTheme(0)}
              value={0}
            />
            <Radio
              className={!props.themePicker.inverted ? "custom-theme-1" : "custom-theme-1 inverted"}
              checked={props.themePicker.theme === 1}
              onClick={() => props.pickTheme(1)}
              value={1}
            />
            <Radio
              className={!props.themePicker.inverted ? "custom-theme-2" : "custom-theme-2 inverted"}              
              checked={props.themePicker.theme === 2}
              onClick={() => props.pickTheme(2)}
              value={2}
            />
            <Radio
              className={!props.themePicker.inverted ? "custom-theme-3" : "custom-theme-3 inverted"}
              checked={props.themePicker.theme === 3}
              onClick={() => props.pickTheme(3)}
              value={3}
            />
            <Radio
              className={!props.themePicker.inverted ? "custom-theme-4" : "custom-theme-4 inverted"}
              checked={props.themePicker.theme === 4}
              onClick={() => props.pickTheme(4)}
              value={4}
            />
            <Radio
              className={!props.themePicker.inverted ? "custom-theme-5" : "custom-theme-5 inverted"}
              checked={props.themePicker.theme === 5}
              onClick={() => props.pickTheme(5)}
              value={5}
            />
            <Radio
              className={!props.themePicker.inverted ? "custom-theme-6" : "custom-theme-6 inverted"}              
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