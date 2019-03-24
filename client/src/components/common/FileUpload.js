import React from 'react';
import {FormControl, FormControlLabel, IconButton,} from "@material-ui/core";
import {SUPPORTED_FILE_TYPES} from "../../config/app";
import List from "../project/version";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CloseIcon from '@material-ui/icons/Close';

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
    this.setState({
      files: Array.from(event.target.files),
    });
  };

  // TOFIX re-insertion to DOM tree after files selection confirmation
  render() {
    return (
      <div>
        <FormControl>
          <FormControlLabel
            disabled={this.state.files.length === 5}
            control={(
              <input
                style={{display: 'none'}}
                accept={SUPPORTED_FILE_TYPES}
                multiple
                type="file"
                onChange={this.handleChange}
              />)}
            label="Nahrať súbor"
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