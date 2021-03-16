import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import profileRequest from '../requests/profile';
import {useParams} from 'react-router-dom'; 
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import Navbar from '../dashboard/elements/appbar';
import PaymentForm from './elements/payment-form';
import profilePublicKey from '../requests/get_user_public_key';
import loggedIn from '../requests/get_user_public_key';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  title: {
    textAlign: 'left',
    paddingTop: "25px"
  },
}));

export default function ProfilePage(props) {
    let {username} = useParams()

    if(username === undefined){
      username = ""
    }

    const classes = useStyles();

    const [user, setUser] = React.useState({});
    const [public_key, setPublicKey] = React.useState({});
    const [isLoading, setLoading] = React.useState(false);
    
    React.useEffect(() => {
      profileRequest(username).then(data => {
          let [status, responseText] = data
          if(username === ""){
            responseText = data[1][0]
          }
          setUser(responseText);
          console.log(responseText);
      })

      profilePublicKey(username).then(data => {
        let [status, responseText] = data
        if(username === ""){
          responseText = data[0]
        }
        setPublicKey(responseText);
        console.log(responseText);
        setLoading(true);
      })
    
    }, [])

    console.log("USER")
    console.log(user)

    return (
        <div>
        <Navbar loggedIn={true} username={props.username}/>
        <Grid container className={classes.root} spacing={0} justify="center" alignItems="center" direction="column">
          {
            isLoading ? 
            <Grid container item direction="column" justify="center" alignItems="center">
            <Avatar className={`${classes.purple} ${classes.large}`}>
                {`${user.accountId.first_name[0]}${user.accountId.last_name[0]}`}
            </Avatar>
            <Typography variant="h4" component="h4" className={classes.title}>{`${user.accountId.first_name} ${user.accountId.last_name}`}</Typography>
            <Typography variant="h4" component="h4" className={classes.title}>{user.short_description}</Typography>
            </Grid>
            : <CircularProgress />  
          }
        </Grid>
        <hr></hr>
        <Grid container className={classes.root} spacing={0} justify="center" alignItems="center" direction="column">
          <Typography variant="h4" component="h4" className={classes.title}>{user.description}</Typography>
        </Grid>
        <hr></hr>
        <Grid container className={classes.root} spacing={0} justify="center" alignItems="center" direction="column">
          <PaymentForm data={public_key}/>
        </Grid>
        </div>
 
    );
  }
  