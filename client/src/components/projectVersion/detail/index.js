import propTypes from 'prop-types';
import React from "react";
import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";
import './index.scss';
import File from "../file";
import {getReadableProjectVersionState} from "../../../utils/projectVersionUtils";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {projectVersionConfig} from "../../../config/app";
import ActionButtons from "../../common/ActionButtons";

const projectVersionStates = [
  {value: projectVersionConfig.states.values.NOT_SET},
  {value: projectVersionConfig.states.values.WORK_IN_PROGRESS},
  {value: projectVersionConfig.states.values.WAITING_FOR_REVIEW},
  {value: projectVersionConfig.states.values.REJECTED},
  {value: projectVersionConfig.states.values.ACCEPTED},
];

class Detail extends React.Component {
  render() {
    return (
      <div className="detail">
        <Typography variant={this.props.latest ? "body1" : "h6"} className="page-title">Detail</Typography>
        <Paper className="paper">
          <TextField
            select
            label="Stav verzie"
            name="state"
            // onChange={props.onChange}
            value={0}
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
            // onChange={props.onChange}
            // value={props.description}
            rows={2}
            rowsMax={2}
            multiline
            fullWidth
          />
          <File/>
          <ActionButtons
            editMode={true}
            onClick={() => ""}
            settingsChanged={() => ""}/>
        </Paper>
      </div>
    )
  }
}

Detail.propTypes = {
  latest: propTypes.bool,
};

export default Detail;