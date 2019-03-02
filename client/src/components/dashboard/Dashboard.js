import './Dashboard.scss';

import { Fade, Paper } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import Fab from '../common/Fab';
import ProjectsList from './ProjectsList';
import React from 'react';
import { getDocumentTitle } from '../../utils/appConfigUtils';
import routes from '../../config/app/routes';
import { timeouts } from '../../config/mui';

class Dashboard extends React.Component {
  componentDidMount() {
    document.title = getDocumentTitle(this._reactInternalFiber.elementType.name);
  }

  render() {
    return (
      <Fade in timeout={timeouts.FADE_IN}>
        <Paper className="dashboard">
          <ProjectsList />
          <Fab
            onClick={() => this.props.history.push(routes.NEW_PROJECT)}
            icon={<AddIcon />}
          />
        </Paper>
      </Fade>
    );
  }
}

export default Dashboard;