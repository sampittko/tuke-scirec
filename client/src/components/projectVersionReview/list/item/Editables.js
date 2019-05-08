import React from 'react';
import propTypes from 'prop-types';
import StringInput from "../../../common/StringInput";
import {projectVersionReviewConfig} from "../../../../config/app";
import {IconButton, Tooltip} from "@material-ui/core";
import AlertCircleOutlineIcon from "mdi-material-ui/AlertCircleOutline";

const Editables = props =>
  <div style={{opacity: 0.7}}>
    <StringInput
      label={
        <div>
          Poznámky
          <Tooltip title="Poznámky slúžia na uloženie informácií spojenými s touto recenziou verzie projektu"
                   placement="right">
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
      value={props.notes}
      rows={4}
      rowsMax={4}
      multiline
      maxLength={projectVersionReviewConfig.MAX_NOTES_LENGTH}
    />
  </div>;

Editables.propTypes = {
  notes: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};

export default Editables;