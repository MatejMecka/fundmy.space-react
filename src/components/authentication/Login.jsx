import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import loginRequest from "../../requests/login";
import Alert from '../general/alert';

export default function SignInSide() {
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
        loginRequest(data).then(response => {
            const [status, responseText] = response
            if(!status){
                setMessage(responseText)
                console.log('Message: ' + message   )
                setOpen(true);
            }
        }).catch((error) => {
            console.log(error)
        })
    
    };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
    <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        inputRef={register({ required: true})}
    />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={register({ required: true})}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    { message }
                </Alert>
            </Snackbar>
            </form>
            
  );
}
