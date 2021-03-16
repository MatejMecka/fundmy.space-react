import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import PaymentForm from './elements/PaymentForm';
import Copyright from '../general/copyright';
import ProfileInfo from './elements/ProfileInfo';
//import updateProfileRequest from '../requests/update_profile.js';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Profile Information', 'Payment details', 'Review your order'];

export default function SetupPage(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [values, setValues] = React.useState({short_description: '', description: '', twitter_profile: ''});
  const [public_key, setPublicKey] = React.useState('')

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div>
          <Typography variant="h6" gutterBottom>
            Information about yourself
          </Typography>
          <ProfileInfo onChange = {handleProfleInfoForm} values = {values} />
        </div>
        );
      case 1:
        return (
          <div>
            <Typography variant="h6" gutterBottom>
             Payment Information
            </Typography>
            <PaymentForm onChange = {handlePaymentForm} />
          </div>
          );
      default:
        throw new Error('Unknown step');
    }
  }


  const handleNext = () => {
    if(activeStep == 0) {

    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleProfleInfoForm = name => event => {
    setValues({...values, [name]: event.target.value});
    console.log(values)
  }

  const handlePaymentForm = public_key => {
    setPublicKey(public_key)
  }

  const isDisabled = function(){
    console.log(activeStep === 0 && values["short_description"].length === 0 && values["description"].length !== 0)
    if(activeStep === 0 && values["short_description"].length === 0 || values["description"].length === 0 ){
      return true
    } 
    if(activeStep === 1 && public_key.length === 0){
      return true
    }
    return false
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            FundMy.Space
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Setup
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Setup successful!
                </Typography>
                <Typography variant="subtitle1">
                  Congragulations! You are now ready to use FundMy.space! Welcome to the club.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={ isDisabled() ? true : false}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish Setup' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}