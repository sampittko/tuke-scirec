import React from 'react';
import routes from '../../config/app/routes';
import { Paper, Fade } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ProjectsList from './ProjectsList';
import Fab from '../common/Fab';
import { timeouts } from '../../config/mui';
import { getDocumentTitle } from '../../config/app/titles';
import './Dashboard.scss';

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
            onClick={() => this.props.history.push(routes.project.new)}
            icon={<AddIcon />}
          />
        </Paper>
      </Fade>
    );
  }
}

export default Dashboard;