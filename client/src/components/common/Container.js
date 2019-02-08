import React from 'react';
import Grid from '@material-ui/core/Grid';
import AppBar from './appbar/Appbar';
import './Container.scss';

class Container extends React.Component {
    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <AppBar />
                </Grid>
                <Grid item xs={12}>
                    {this.props.children}
                </Grid>
            </Grid>
        );
    }
}

export default Container;
