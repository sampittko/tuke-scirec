import React from 'react';
import {IconButton, Tooltip} from "@material-ui/core";
import propTypes from 'prop-types';
import PencilIcon from 'mdi-material-ui/Pencil';
import ContentSaveIcon from 'mdi-material-ui/ContentSave';
import CloseIcon from 'mdi-material-ui/Close';
import DeleteIcon from 'mdi-material-ui/Delete';
import './PaperActions.scss';

const PaperActions = props =>
  <div className={`paper-actions ${props.relative ? "relative" : ""}`}>
    {props.editMode ? (
      <div>
        {props.deleteVisible && (
          <div className="delete">
            <Tooltip
              title="Odstrániť"
              placement="right"
              disableFocusListener
            >
              <IconButton
                onClick={(event) => props.onClick(event, 'delete')}
                disabled={props.updating}
              >
                <DeleteIcon fontSize="small"/>
              </IconButton>
            </Tooltip>
          </div>
        )}
        <div className="save-and-cancel">
          <Tooltip
            title="Zrušiť režim úprav"
            placement="left"
            disableFocusListener
          >
            <IconButton
              onClick={(event) => props.onClick(event, 'cancel')}
              disabled={props.updating}
            >
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
                disabled={!props.settingsChanged() || props.updating}
              >
                <ContentSaveIcon fontSize="small"/>
              </IconButton>
            </div>
          </Tooltip>
        </div>
      </div>
    ) : (
      <div className="edit">
        <Tooltip
          title="Režim úprav"
          placement="left"
          disableFocusListener
        >
          <IconButton onClick={(event) => props.onClick(event, 'edit')}>
            <PencilIcon fontSize="small"/>
          </IconButton>
        </Tooltip>
      </div>
    )}
  </div>;

PaperActions.propTypes = {
  editMode: propTypes.bool.isRequired,
  onClick: propTypes.func.isRequired,
  settingsChanged: propTypes.func.isRequired,
  deleteVisible: propTypes.bool,
  relative: propTypes.bool,
  updating: propTypes.bool,
};

export default PaperActions;