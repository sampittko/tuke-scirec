import React from 'react';
import ExpansionPanel from '../../common/ExpansionPanel';
import propTypes from 'prop-types';
import PaperActions from "../../common/PaperActions";
import File from "../../file";

const Item = props =>
  <ExpansionPanel
    expanded={props.expanded}
    onChange={props.onChange}
    panelActions={(
      <PaperActions
        relative
        editMode={false}
        onClick={() => ""}
        settingsChanged={() => false}
      />
    )}
    panelContent={<File/>}
    title="Posudok 1"
  />;

Item.propTypes = {
  expanded: propTypes.bool.isRequired,
  onChange: propTypes.func.isRequired,
};

export default Item;