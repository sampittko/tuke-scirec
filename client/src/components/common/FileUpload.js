import React from 'react';
import {FormControl, FormControlLabel, IconButton, List, Typography} from "@material-ui/core";
import {fileConfig} from "../../config/app";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import './FileUpload.scss';

// TODO handle max files size
class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      open: false,
    }
  }

  handleClick = (event, fileToRemove) => {
    this.setState(state => ({
      files: state.files.filter(file => file.lastModified !== fileToRemove.lastModified && file.name !== fileToRemove.name)
    }))
  };

  handleChange = event => {
    let files = Array.from(event.target.files);
    if (files.length <= fileConfig.MAX_FILES) {
      this.setState({
        files,
      });
    } else {
      // TODO alert for selecting too many files
      console.log("too many files selected");
    }
  };

  render() {
    return (
      <div className="file-upload">
        <FormControl>
          <FormControlLabel
            disabled={this.state.files.length >= 5}
            control={(
              <input
                style={{display: 'none'}}
                accept={fileConfig.SUPPORTED_FORMATS}
                multiple
                type="file"
                onChange={this.handleChange}
              />
            )}
            label={(
              <Button
                disabled={this.state.files.length >= 5}
                size="small"
                color="secondary"
                component="span"
                className="select-files-button"
              >
                Vybrať súbory
              </Button>
            )}
          />
        </FormControl>
        {this.state.files.length > 0 && (
          <div>
            <Typography className="file-counter">{this.state.files.length}/{fileConfig.MAX_FILES}</Typography>
            <List dense className="files">
              {this.state.files.map((file, i) => (
                <ListItem key={i} className="file">
                  <ListItemText primary={file.name}/>
                  <ListItemSecondaryAction onClick={(event) => this.handleClick(event, file)}>
                    <IconButton>
                      <CloseIcon fontSize="small"/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </div>
    );
  }
}

export default FileUpload;