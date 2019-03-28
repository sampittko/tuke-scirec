import React from 'react';
import {IconButton, Tooltip} from "@material-ui/core";
import propTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

const ActionButtons = props =>
  <div className="action-buttons">
    {props.editMode ? (
      <div>
        <Tooltip
          title="Zrušiť úpravy"
          placement="left"
          disableFocusListener
        >
          <IconButton onClick={(event) => props.onClick(event, 'cancel')}>
            <CloseIcon fontSize="small"/>
          </IconButton>
        </Tooltip>
        <Tooltip
          title="Uložiť zmeny"
          placement="left"
          disableFocusListener
        >
          <div style={{display: 'inline'}}>
            <IconButton
              onClick={(event) => props.onClick(event, 'save')}
              disabled={!props.settingsChanged()}
            >
              <SaveIcon fontSize="small"/>
            </IconButton>
          </div>
        </Tooltip>
      </div>
    ) : (
      <Tooltip
        title="Upraviť prehľad projektu"
        placement="left"
        disableFocusListener
      >
        <IconButton onClick={(event) => props.onClick(event, 'edit')}>
          <EditIcon fontSize="small"/>
        </IconButton>
      </Tooltip>
    )}
  </div>;

ActionButtons.propTypes = {
  editMode: propTypes.bool.isRequired,
  onClick: propTypes.func.isRequired,
  settingsChanged: propTypes.func.isRequired,
};

export default ActionButtons;