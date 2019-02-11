import React from 'react';
import { Fab, Typography, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './Dashboard.scss';

class Dashboard extends React.Component {
    render() {
        return (
            <Paper className="dashboard">
                <Typography variant="h5">
                    Projects
                </Typography>
                <Fab className="fab" color="secondary">
                    <AddIcon />
                </Fab>
            </Paper>
        );
    }
}

export default Dashboard;