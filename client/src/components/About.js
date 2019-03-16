import './About.scss';

import { Fade, Typography } from '@material-ui/core';

import React from 'react';
import { getDocumentTitleFromComponent } from '../utils/appConfigUtils';
import { timeouts } from '../config/mui';

class About extends React.Component {
  componentDidMount() {
    document.title = getDocumentTitleFromComponent(this);
  }

  render() {
    return (
      <Fade in timeout={timeouts.FADE_IN}>
        <div className="about">
          <Typography variant="h6">
            SCIREC
          </Typography>
          <Typography>
            Copyright © Samuel Pitoňák 2019. Všetky práva vyhradené.
          </Typography>
        </div>
      </Fade>
    );
  }
}

export default About;