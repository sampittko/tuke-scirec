import React from 'react';
import {
  Button,
  DialogActions,
  DialogContentText,
  FormControl,
  FormControlLabel,
  IconButton,
  List,
  Tooltip,
  Typography
} from "@material-ui/core";
import {fileConfig} from "../../config/app";
import ListItem from "@material-ui/core/ListItem/index";
import ListItemText from "@material-ui/core/ListItemText/index";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/index";
import CloseIcon from 'mdi-material-ui/Close';
import propTypes from 'prop-types';
import './UploaderDialog.scss';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogTransition from "../common/DialogTransition";
import DialogContent from "@material-ui/core/DialogContent";
import {timeouts} from "../../config/mui";
import Fade from "@material-ui/core/Fade";
import {connect} from "react-redux";
import {uploadFiles} from "../../store/actions/fileActions";
import {convertBtoMB, countFilesSize} from "../../utils/fileUtils";

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
      filesSize: countFilesSize(newFiles),
    })
  };

  handleChange = event => {
    let files = Array.from(event.target.files);
    if (files.length <= fileConfig.MAX_FILES) {
      this.setState({
        files,
        filesCountError: false,
        filesSize: countFilesSize(files),
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
    this.props.uploadFiles(this.state.files, this.props.ownerEntity, this.props.filesIndex);
    this.props.onClick();
  };

  fileConditionsMet = file => {
    return file.name.length <= fileConfig.MAX_NAME_LENGTH
      && convertBtoMB(file.size) <= fileConfig.MAX_SINGLE_FILE_SIZE_MB;
  };

  render() {
    return (
      <Dialog open={this.props.open} TransitionComponent={DialogTransition}>
        <DialogTitle className="file-uploader-dialog-title">Nahrávanie súborov</DialogTitle>
        <form onSubmit={this.handleSubmit} className="file-uploader-form">
          <DialogContent className="file-uploader">
            <DialogContentText>
              Naraz je možné nahrať {fileConfig.MAX_FILES} súborov pričom každý môže mať
              najviac {fileConfig.MAX_SINGLE_FILE_SIZE_MB}MB. Ak majú dva súbory rovnaký názov vrátane prípony,
              bude predošlý nahratý súbor nahradený posledným nahratým súborom. Názov súbou môže mať
              najviac {fileConfig.MAX_NAME_LENGTH} znakov vrátane prípony.
            </DialogContentText>
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
                label="Vybrať súbory"
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
                    <Tooltip
                      key={i}
                      title={this.fileConditionsMet(file) ? "Súbor môže byť nahraný" : "Súbor nemôže byť nahraný kvôli nesplneným podmienkam"}
                    >
                      <ListItem
                        className="file"
                        disabled={!this.fileConditionsMet(file)}
                      >
                        <ListItemText primary={file.name}/>
                        <ListItemSecondaryAction onClick={(event) => this.handleClick(event, file)}>
                          <IconButton disableRipple>
                            <CloseIcon fontSize="small"/>
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                  ))}
                </List>
                <Typography variant="caption" className="files-size-sum">Celková
                  veľkosť {this.state.files.length > 1 ? "súborov" : "súboru"}: {this.state.filesSize}MB</Typography>
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
              disabled={this.state.files.length === 0 || convertBtoMB(this.props.filesSize) > 15}
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
  uploadFiles: propTypes.func.isRequired,
  ownerEntity: propTypes.object.isRequired,
  filesIndex: propTypes.number.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    uploadFiles: (files, ownerEntity, filesIndex) => dispatch(uploadFiles(files, ownerEntity, filesIndex)),
  }
};

export default connect(null, mapDispatchToProps)(UploaderDialog);