import React from 'react';
import {FormControl, FormControlLabel, IconButton, List, Typography} from "@material-ui/core";
import {fileConfig} from "../../../config/app";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import './Uploader.scss';

// TODO handle max files size
class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      filesCountError: false,
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
        filesCountError: false,
      });
    } else {
      this.setState({
        files: [],
        filesCountError: true,
      })
    }
  };

  render() {
    return (
      <div className="file-uploader">
        <Typography>Nahrávanie súborov</Typography>
        <FormControl className="select-file-button">
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
        {this.state.filesCountError &&
        <Typography variant="caption" className="many-files-message">Vybrali ste veľa súborov.</Typography>}
        <Typography className="file-counter">{this.state.files.length}/{fileConfig.MAX_FILES}</Typography>
        {this.state.files.length > 0 && (
          <div>
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
            <Typography variant="caption" className="files-size-sum">X z 15MB</Typography>
          </div>
        )}
      </div>
    );
  }
}

export default Uploader;