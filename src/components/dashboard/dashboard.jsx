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
          minWidth: 275,
          padding: "50px"
        },
        bullet: {
          display: "inline-block",
          margin: "0 2px",
          transform: "scale(0.8)"
        },
        title: {
          textAlign: 'left'
        },
        no_results: {
            textAlign: 'center'
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
        }
      }));

    const classes = useStyles();

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
            <Typography variant="h4" component="h4" className={classes.title}>Balances</Typography>
                <Grid item xs={6}>
                    <BalanceCard/>
                </Grid>
            </Grid>
            <Grid container justify="center" alignItems="center" direction="column" spacing={2}>
                <Grid item xs={12}>
                    <Avatar className={classes.avatar}>
                        <SentimentVeryDissatisfiedIcon />
                    </Avatar>
                </Grid>
                <Typography variant="h4" component="h4" className={classes.no_results}>No pending claimable balances.</Typography>
            </Grid>

            <Grid container justify="center" alignItems="center" direction="column" spacing={50} m={50}>
                <Grid item xs={12}>
                    <Avatar className={classes.avatar}>
                        <SentimentVeryDissatisfiedIcon />
                    </Avatar>
                </Grid>
                <Typography variant="h4" component="h4" className={classes.no_results}>No past operations.</Typography>
            </Grid>

        </Grid>
    )
}