import React from 'react';
import { Redirect } from 'react-router';
import routes from '../../config/app/routes';
import { Paper, Fade } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ProjectsList from './ProjectsList';
import Fab from '../common/Fab';
import { transitions } from '../../config/app/ui';
import { getDocumentTitle } from '../../config/app/titles';
import './Dashboard.scss';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toNewProject: false
    }
  }

  componentDidMount() {
    document.title = getDocumentTitle(this);
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