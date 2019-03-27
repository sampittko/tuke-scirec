import React from 'react';
import {FormControl, FormControlLabel, IconButton, List} from "@material-ui/core";
import {fileConfig} from "../../config/app";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";

// TODO handle files count
// TODO handle max files size
class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
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
      <div>
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
                variant="contained"
                component="span"
              >
                Upload
              </Button>
            )}
          />
        </FormControl>
        {this.state.files.length > 0 && (
          <List dense>
            {this.state.files.map((file, i) => (
              <ListItem key={i}>
                <ListItemText primary={file.name}/>
                <ListItemSecondaryAction onClick={(event) => this.handleClick(event, file)}>
                  <IconButton>
                    <CloseIcon/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </div>
    );
  }
}

export default FileUpload;