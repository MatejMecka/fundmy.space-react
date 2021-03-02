import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { makeStyles } from "@material-ui/core/styles";

export default function NotFound(props) {
    const useStyles = makeStyles((theme) => ({
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        no_results: {
            textAlign: 'center'
        },
        errorMessage: {
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        },
    }));

    const classes = useStyles();

    return (
        <Grid container item className={classes.errorMessage} direction="row">
            <Avatar className={classes.avatar}>
                <SentimentVeryDissatisfiedIcon />
            </Avatar>
            <Typography variant="body1" component="h4" className={classes.no_results}>{props.message}</Typography>
        </Grid>
    )
}