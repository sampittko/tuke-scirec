import React from 'react';
import Grid from '@material-ui/core/Grid';
import Appbar from './appbar/Appbar';

const Container = props =>
    <Grid container>
        <Grid item xs={12}>
            <Appbar />
        </Grid>
        <Grid item xs={12}>
            {props.children}
        </Grid>
    </Grid>;

export default Container;
