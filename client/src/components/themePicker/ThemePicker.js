import './ThemePicker.scss';

import { FormControl, FormControlLabel, Radio } from '@material-ui/core';

import React from 'react';
import { connect } from 'react-redux';
import { pickTheme } from '../../store/actions/themePickerActions';
import propTypes from 'prop-types';

const ThemePicker = props =>
  <FormControl>
    <FormControlLabel
      control={
        <div>
          <Radio
            className="scirec-theme"
            checked={props.selectedTheme === 0}
            onClick={() => props.pickTheme(0)}
            value={0}
          />
          <Radio
            className="custom-theme-1"
            checked={props.selectedTheme === 1}
            onClick={() => props.pickTheme(1)}
            value={1}
          />
          <Radio
            className="custom-theme-2"
            checked={props.selectedTheme === 2}
            onClick={() => props.pickTheme(2)}
            value={2}
          />
          <Radio
            className="custom-theme-3"
            checked={props.selectedTheme === 3}
            onClick={() => props.pickTheme(3)}
            value={3}
          />
          <Radio
            className="custom-theme-4"
            checked={props.selectedTheme === 4}
            onClick={() => props.pickTheme(4)}
            value={4}
          />
          <Radio
            className="custom-theme-5"
            checked={props.selectedTheme === 5}
            onClick={() => props.pickTheme(5)}
            value={5}
          />
          <Radio
            className="custom-theme-6"
            checked={props.selectedTheme === 6}
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
  pickTheme: propTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    pickTheme: theme => dispatch(pickTheme(theme))
  }
}

const mapStateToProps = state => {
  return {
    selectedTheme: state.themePicker.theme
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemePicker);