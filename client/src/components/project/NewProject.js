import React from 'react';
import routes from '../../config/app/routes';
import { Redirect } from 'react-router';
import { Paper, TextField, Button, Stepper, Step, StepLabel, StepContent, Typography, MenuItem, Fade } from '@material-ui/core';
import { transitions } from '../../config/app/ui';
import { getDocumentTitle } from '../../config/app/titles';
import './NewProject.scss';

const TITLE_MIN_LENGTH = 3;

class NewProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      title: '',
      category: 0
    }
  }

  steps = ['Zvolenie názvu', 'Výber kategórie'];

  componentDidMount() {
    document.title = getDocumentTitle(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1
    });
  }

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  }

  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <TextField
            label="Názov projektu"
            type="text"
            name="title"
            margin="normal"
            value={this.state.title}
            variant="outlined"
            helperText={this.state.title.length < TITLE_MIN_LENGTH ? "Názov musí mať aspoň " + TITLE_MIN_LENGTH + " znaky" : ""}
            onChange={this.handleChange}
            required
          />
        );
      case 1:
        return (
          <TextField
            select
            label="Kategória projektu"
            value={0}
            name="category"
            margin="normal"
            variant="outlined"
          >
            <MenuItem value={0}>Predvolená kategória</MenuItem>
          </TextField>
        );
      default:
        return "Neznámy krok";
    }
  }

  render() {
    return (
      <Fade in timeout={transitions.FADE_IN_TIMEOUT}>
        <Paper className="new-project">
          <Typography variant="h5">
            Vytvorenie nového projektu
          </Typography>
          <Stepper activeStep={this.state.activeStep} orientation="vertical">
            {this.steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography component="span">
                      {this.getStepContent(index)}
                  </Typography>
                  <Button
                    disabled={this.state.activeStep === 0}
                    onClick={this.handleBack}
                  >
                    Späť
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    disabled={this.state.activeStep === 0 && this.state.title.length < 3}
                  >
                    {this.state.activeStep === this.steps.length - 1 ? 'Pridať' : 'Ďalej'}
                  </Button>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {this.state.activeStep === this.steps.length && (
            <Redirect to={routes.dashboard} />
          )}
        </Paper>
      </Fade>
    );
  }
}

export default NewProject;