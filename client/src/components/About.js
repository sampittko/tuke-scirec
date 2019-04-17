import './About.scss';

import {Fade, Typography} from '@material-ui/core';

import React from 'react';
import {getDocumentTitleFromComponent} from '../utils/appConfigUtils';
import {timeouts} from '../config/mui';

class About extends React.Component {
  componentDidMount() {
    document.title = getDocumentTitleFromComponent("About");
  }

  render() {
    return (
      <Fade in timeout={timeouts.FADE_IN}>
        <div className="about">
          <Typography variant="h6">
            SCIREC
          </Typography>
          <Typography>
            Copyright &copy; Samuel Pitoňák {new Date().getFullYear()}
          </Typography>
        </div>
      </Fade>
    );
  }
}

export default About;