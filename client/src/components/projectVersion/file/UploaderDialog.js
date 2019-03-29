import React from 'react';
import {Button, DialogActions, FormControl, FormControlLabel, IconButton, List, Typography} from "@material-ui/core";
import {fileConfig} from "../../../config/app";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CloseIcon from '@material-ui/icons/Close';
import propTypes from 'prop-types';
import './UploaderDialog.scss';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogTransition from "../../common/DialogTransition";
import DialogContent from "@material-ui/core/DialogContent";
import {timeouts} from "../../../config/mui";
import Fade from "@material-ui/core/Fade";

// TODO handle max files size
class UploaderDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      filesCountError: false,
      filesSize: 0,
    }
  }

  handleClick = (event, fileToRemove) => {
    const newFiles = this.state.files.filter(file => file.lastModified !== fileToRemove.lastModified && file.name !== fileToRemove.name);
    this.setState({
      files: newFiles,
      filesSize: this.countFilesSize(newFiles),
    })
  };

  convertBtoMB = bytes => {
    return Math.round((bytes / 1000000) * 1000) / 1000;
  };

  countFilesSize = files => {
    let bytes = 0;
    files.forEach(file => {
      bytes += file.size;
    });
    return this.convertBtoMB(bytes);
  };

  handleChange = event => {
    let files = Array.from(event.target.files);
    if (files.length <= fileConfig.MAX_FILES) {
      this.setState({
        files,
        filesCountError: false,
        filesSize: this.countFilesSize(files),
      });
    } else {
      this.setState({
        files: [],
        filesCountError: true,
        filesSize: 0,
      })
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("Form submitted");
    this.props.onClick();
  };

  render() {
    return (
      <Dialog open={this.props.open} TransitionComponent={DialogTransition}>
        <DialogTitle className="file-uploader-dialog-title">Nahrávanie súborov</DialogTitle>
        <form onSubmit={this.handleSubmit} className="file-uploader-form">
          <DialogContent className="file-uploader">
            <FormControl className="add-files-area">
              <FormControlLabel
                disabled={this.state.files.length >= 5 || !this.props.editable}
                control={(
                  <input
                    style={{display: 'none'}}
                    accept={fileConfig.SUPPORTED_FORMATS}
                    multiple
                    type="file"
                    onChange={this.handleChange}
                  />
                )}
                label="Pridať súbory"
              />
            </FormControl>
            {this.state.filesCountError && (
              <Fade in timeout={timeouts.FADE_IN}>
                <Typography variant="caption" className="many-files-message">Vybrali ste veľa súborov</Typography>
              </Fade>
            )}
            <Typography className="file-counter">{this.state.files.length}/{fileConfig.MAX_FILES}</Typography>
            {this.state.files.length > 0 && (
              <div>
                <List dense className="files">
                  {this.state.files.map((file, i) => (
                    <ListItem key={i} className="file">
                      <ListItemText primary={file.name}/>
                      <ListItemSecondaryAction onClick={(event) => this.handleClick(event, file)}>
                        <IconButton disableRipple>
                          <CloseIcon fontSize="small"/>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
                <Typography variant="caption" className="files-size-sum">{this.state.filesSize}MB / 15MB</Typography>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.props.onClick}
              color="primary"
              type="button"
            >
              Zrušiť
            </Button>
            <Button
              type="submit"
              color="secondary"
              disabled={this.state.files.length === 0}
            >
              Nahrať
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.open && !this.props.open) {
      this.setState({
        files: [],
        filesCountError: false,
        filesSize: 0,
      });
    }
  }
}

UploaderDialog.propTypes = {
  editable: propTypes.bool,
  open: propTypes.bool.isRequired,
  onClick: propTypes.func.isRequired,
};

export default UploaderDialog;