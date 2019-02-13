import React from 'react';
import { Redirect } from 'react-router';
import routes from '../../routes';
import { Fab, Paper } from '@material-ui/core';
import ProjectsList from './ProjectsList';
import AddIcon from '@material-ui/icons/Add';
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
        {this.state.toNewProject ? (
          <Redirect to={routes.project.new} />
        ) : (
          <Paper className="dashboard">
            <ProjectsList />
            <Fab onClick={this.handleNewProjectClick} className="fab" color="secondary">
              <AddIcon />
            </Fab>
          </Paper>
        )}
      </div>
    );
  }
}

export default Dashboard;