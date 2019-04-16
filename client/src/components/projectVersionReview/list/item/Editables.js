import React from 'react';
import propTypes from 'prop-types';
import StringInput from "../../../common/StringInput";
import {projectVersionReviewConfig} from "../../../../config/app";

const Editables = props =>
  <div style={{opacity: 0.7}}>
    <StringInput
      label="Poznámky"
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