import React from 'react';
import propTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";
import {projectVersionConfig} from "../../../config/app";
import {getReadableProjectVersionState} from "../../../utils/projectVersionUtils";
import File from "../../file";

const projectVersionStates = [
  {value: projectVersionConfig.states.values.NOT_SET},
  {value: projectVersionConfig.states.values.WORK_IN_PROGRESS},
  {value: projectVersionConfig.states.values.WAITING_FOR_REVIEW},
  {value: projectVersionConfig.states.values.REJECTED},
  {value: projectVersionConfig.states.values.ACCEPTED},
];

const Editables = props =>
  <div style={{opacity: 0.7}}>
    <TextField
      select
      label="Stav verzie"
      name="state"
      onChange={props.onChange}
      InputProps={{readOnly: false}}
      value={props.state}
      fullWidth
    >
      {projectVersionStates.map(state => (
        <MenuItem key={state.value} value={state.value}>
          {getReadableProjectVersionState(state.value)}
        </MenuItem>
      ))}
    </TextField>
    <TextField
      label="Poznámky"
      name="notes"
      onChange={props.onChange}
      InputProps={{readOnly: false}}
      value={props.notes}
      rows={7}
      rowsMax={7}
      multiline
      fullWidth
    />
    <File ownerEntity={props.filesOwnerEntity} editable/>
  </div>;

Editables.propTypes = {
  state: propTypes.number.isRequired,
  notes: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  filesOwnerEntity: propTypes.object.isRequired,
};

export default Editables;