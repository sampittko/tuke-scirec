import './NewDefaultDashboardSelectMenu.scss';

import { FormControl, FormHelperText, MenuItem, Select } from '@material-ui/core';

import React from 'react';
import propTypes from 'prop-types';

const SelectMenu = props =>
  <FormControl className="default-dashboard-selector">
    <Select
      required
      value={props.value}
      onChange={props.onChange}
      placeholder="Vyberte novú predvolenú nástenku"
    >
      {props.dashboards.map((dashboard, i) => (
        <MenuItem
          key={i}
          value={dashboard.id}
          disabled={dashboard.id === props.activeDashboard.id}
        >
          {dashboard.data().title}
        </MenuItem>
      ))}
    </Select>
    <FormHelperText>Nová predvolená nástenka</FormHelperText>
  </FormControl>;

SelectMenu.propTypes = {
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  dashboards: propTypes.arrayOf(propTypes.object).isRequired,
  activeDashboard: propTypes.any
}

export default SelectMenu;