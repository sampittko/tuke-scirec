import React from 'react';
import {IconButton, Tooltip} from "@material-ui/core";
import propTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
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
              <IconButton onClick={(event) => props.onClick(event, 'delete')}>
                <DeleteIcon fontSize="small"/>
              </IconButton>
            </Tooltip>
          </div>
        )}
        <div className="save-and-cancel">
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
      </div>
    ) : (
      <div className="edit">
        <Tooltip
          title="Upraviť"
          placement="left"
          disableFocusListener
        >
          <IconButton onClick={(event) => props.onClick(event, 'edit')}>
            <EditIcon fontSize="small"/>
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
};

export default PaperActions;