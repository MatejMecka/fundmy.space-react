import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import Alert from '../general/alert';
import signUpRequest from '../requests/signup';

export default function SignUpSide() {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };


    const useStyles = makeStyles((theme) => ({
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));

  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    signUpRequest(data).then(response => {
        const [status, responseText] = response
        if(!status){
            setMessage(responseText)
            console.log('Message: ' + message   )
            setOpen(true);
        }
    }).catch((error) => {
        console.log(error)
    })
    }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
                    autoComplete="username"
                    name="username"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="Username"
                    autoFocus
                    inputRef={register({ required: true})}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First name"
                autoFocus
                inputRef={register({ required: true})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last name"
                name="last_name"
                autoComplete="lname"
                inputRef={register({ required: true})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email address"
                name="email"
                autoComplete="email"
                type="email"
                inputRef={register({ required: true})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password1"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register({ required: true})}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    { message }
                </Alert>
            </Snackbar>
        </form>
  );
}
