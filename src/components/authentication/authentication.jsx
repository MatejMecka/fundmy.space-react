import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';  
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SignInSide from './Login';
import SignUpSide from './SignUp';  
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { useState } from 'react';
import Copyright from '../general/copyright';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    
  }));
  

  export default function Authentication() {
    const classes = useStyles();
    const [signUp, setSignUp] = useState(false);
  
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {signUp ? 'Sign up' : 'Sign in'}
            </Typography>
              {signUp ? <SignUpSide /> : <SignInSide /> }
          </div>
          <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs>
                <Link href="#" variant="body2" onClick={() => setSignUp(signUp ? false : true )}>
                  {signUp ? "Already have an account? Sign in" : "Don't have an account? Sign Up" }
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
        </Grid> 
      </Grid>
    );
  }
  