import React from 'react';
import propTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";
import {projectVersionConfig} from "../../../config/app";
import {getReadableProjectVersionState} from "../../../utils/projectVersionUtils";
import StringInput from "../../common/StringInput";
import {IconButton, Tooltip} from "@material-ui/core";
import AlertCircleOutlineIcon from "mdi-material-ui/AlertCircleOutline";

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
      label={
        <div>
          Stav verzie
          <Tooltip title="Stav verzie má len informačný charakter" placement="right">
            <IconButton
              style={{cursor: "default", position: "absolute", top: "-15px"}}
              disableRipple
            >
              <AlertCircleOutlineIcon/>
            </IconButton>
          </Tooltip>
        </div>
      }
      name="state"
      onChange={props.onChange}
      value={props.state}
      fullWidth
    >
      {projectVersionStates.map(state => (
        <MenuItem key={state.value} value={state.value}>
          {getReadableProjectVersionState(state.value)}
        </MenuItem>
      ))}
    </TextField>
    <StringInput
      label={
        <div>
          Poznámky
          <Tooltip title="Poznámky slúžia na uloženie informácií spojenými s touto verziou projektu" placement="right">
            <IconButton
              style={{cursor: "default", position: "absolute", top: "-15px"}}
              disableRipple
            >
              <AlertCircleOutlineIcon/>
            </IconButton>
          </Tooltip>
        </div>
      }
      name="notes"
      onChange={props.onChange}
      maxLength={projectVersionConfig.MAX_NOTES_LENGTH}
      value={props.notes}
      rows={4}
      rowsMax={4}
      multiline
    />
  </div>;

Editables.propTypes = {
  state: propTypes.number.isRequired,
  notes: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};

export default Editables;