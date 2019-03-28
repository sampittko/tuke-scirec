import React from 'react';
import {IconButton, Tooltip} from "@material-ui/core";
import propTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import './EditModeActionButtons.scss';

const EditModeActionButtons = props =>
  <div className="edit-mode-action-buttons">
    {props.editMode ? (
      <div>
        <Tooltip
          title="Zrušiť zmeny"
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
        title="Upraviť"
        placement="left"
        disableFocusListener
      >
        <IconButton onClick={(event) => props.onClick(event, 'edit')}>
          <EditIcon fontSize="small"/>
        </IconButton>
      </Tooltip>
    )}
  </div>;

EditModeActionButtons.propTypes = {
  editMode: propTypes.bool.isRequired,
  onClick: propTypes.func.isRequired,
  settingsChanged: propTypes.func.isRequired,
};

export default EditModeActionButtons;