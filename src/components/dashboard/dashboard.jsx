import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { spacing } from '@material-ui/system';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import BalanceCard from './elements/currency_card' ;
import { makeStyles } from "@material-ui/core/styles";
export default function Dashboard() {

    const useStyles = makeStyles((theme) => ({
        root: {
 //         minWidth: 275,
          padding: "50px",
        },
        thatDiv: {
          display: "flex",
          alignItems: "center",
          alignContent: "center"
        },
        bullet: {
          display: "inline-block",
          margin: "0 2px",
          transform: "scale(0.8)"
        },
        title: {
          textAlign: 'left',
          paddingBottom: "25px"
        },
        no_results: {
            textAlign: 'center'
        },
        errorMessage: {
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        },
        pos: {
          marginBottom: 12
        },
        value: {
          textAlign: 'left'
        },
        body: {
            padding: "5px"
        },
        pending_balances: {
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
          },
        divider: {
            border: `1px solid ${theme.palette.divider}`
        },
        card: {
          paddingBottom: "25px"
        }
      }));

    const classes = useStyles();

    return (
      <div className={classes.thatDiv}>
        <Grid container className={classes.root} spacing={0 } justify="center" alignItems="center" direction="column">
            <Grid container item spacing={5}>
            <Typography variant="h4" component="h4" className={classes.title}>Balances</Typography>
                <Grid item container direction="row" justify="center" alignItems="center">
                  <Grid item xs={12} sm={4} className={classes.card}>
                      <BalanceCard/>
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.card}>
                      <BalanceCard/>
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.card}>
                      <BalanceCard/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item > 
            <Typography variant="h4" component="h4" className={classes.title}>Claimable Balances</Typography>
                <Grid container item className={classes.errorMessage} direction="row">
                    <Avatar className={classes.avatar}>
                        <SentimentVeryDissatisfiedIcon />
                    </Avatar>
                    <Typography variant="h6" component="h4" className={classes.no_results}>No pending claimable balances.</Typography>
                </Grid>
            </Grid>

            <Grid container item >
              <Typography variant="h4" component="h4" className={classes.title}>Past operations</Typography>
              <Grid container item className={classes.errorMessage} direction="row">
                  <Avatar className={classes.avatar}>
                      <SentimentVeryDissatisfiedIcon />
                  </Avatar>
                  <Typography variant="body1" component="h4" className={classes.no_results}>No past operations.</Typography>
              </Grid>
            </Grid>

        </Grid>
      </div>
    )
}