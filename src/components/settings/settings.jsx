import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import Navbar from '../dashboard/elements/appbar';
import PaymentForm from '../setup/elements/PaymentForm';
import ProfileInfo from '../setup/elements/ProfileInfo';
import UserInfo from './elements/basic_user_info';
import profileRequest from '../requests/profile';

export default function SettingsPage(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
          minWidth: 275,
          padding: "50px",
        }, 
        title: {
            textAlign: 'left',
            paddingBottom: "25px"
          },
    
    }))

    const classes = useStyles();
    const [values, setValues] = React.useState({short_description: '', description: '', twitter_profile: ''});

    const [isLoaded, setIsLoaded] = React.useState(false);
    const [balances, setBalances] = React.useState([]);

    console.log(props.user)

    React.useEffect(() => {
        profileRequest('').then(data => {
          const [status, responseText] = data
          setIsLoaded(true);
          setValues(
              {
                short_description:responseText[0]["short_description"],
                description:responseText[0]["description"],
                twitter_profile:responseText[0]["twitter_profile"],
                }
            )
          setBalances(responseText);
          console.log(responseText);
        })
    }, []);

    const handleProfleInfoForm = name => event => {
        setValues({...values, [name]: event.target.value});
        console.log(values)
    }

    return (
        <div>
        <Navbar loggedIn={true} username={""}/>
        <Grid container className={classes.root} spacing={0} justify="center" alignItems="center" direction="column">
            <Grid container item>
                <Typography variant="h4" component="h4" className={classes.title}>Profile Information</Typography>
                <UserInfo />
            </Grid>
            <Grid container item>
                <Typography variant="h4" component="h4" className={classes.title}>Public Information</Typography>
                <ProfileInfo onChange = {handleProfleInfoForm} values = {values} />
                <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update public profile information
          </Button>
            </Grid>
            <Grid container item>
                <Typography variant="h4" component="h4" className={classes.title}>Payment Information</Typography>
                <PaymentForm />
            </Grid>
        </Grid>
        </div>
        )
}