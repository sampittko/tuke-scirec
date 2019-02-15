import React from 'react';
import { Redirect } from 'react-router';
import routes from '../../routes';
import { Paper, Fade } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ProjectsList from './ProjectsList';
import Fab from '../common/Fab';
import { transitions } from '../../config/ui';
import './Dashboard.scss';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toNewProject: false
    }
  }

  handleNewProjectClick = () => {
    this.setState({
      toNewProject: true
    });
  }

  render() {
    return (
      <div>
        {!this.state.toNewProject ? (
          <Fade in timeout={transitions.FADE_IN_TIMEOUT}>
            <Paper className="dashboard">
              <ProjectsList />
              <Fab
                // onClick={<Redirect to={routes.project.new} />}
                onClick={this.handleNewProjectClick}
                icon={<AddIcon />}
              />
            </Paper>
          </Fade>
        ) : (
          <Redirect to={routes.project.new} />
        )}
      </div>
    );
  }
}

export default Dashboard;