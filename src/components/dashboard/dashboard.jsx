import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BalanceCard from './elements/currency_card' ;
import NotFound from "./elements/not-found";
import ClaimableBalanceTable from "./elements/claimable_balances_table";
import OperationsTable from "./elements/operations_table";
import balancesRequest from '../requests/balances';
import Navbar from './elements/appbar';
import claimableBalancesRequest from '../requests/claimable_balances';
import operationsRequest from '../requests/operations';
import { makeStyles } from "@material-ui/core/styles";

function ClaimableBalances(data){
  console.log(data['data'])
  if(data['data'].length != 0){
    return <ClaimableBalanceTable data={data["data"]}/>
  } else {
    return <NotFound message="No claimable balances have been found"/>
  }
}

function Operations(data){
  console.log(data['data'])
  if(data['data'].length != 0){
    return <OperationsTable data={data["data"]}/>
  } else {
    return <NotFound message="No past operations have been found"/>
  }
}

export default function Dashboard() {
    const useStyles = makeStyles((theme) => ({
        root: {
          minWidth: 275,
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
        divider: {
            border: `1px solid ${theme.palette.divider}`
        },
        card: {
          paddingBottom: "25px"
        },
        lastTitle: {
          paddingTop: "25px"
        }
      }));

    const classes = useStyles();
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [balances, setBalances] = React.useState([]);
    const [claimableBalances, setClaimableBalances] = React.useState([]);
    const [operations, setOperations] = React.useState([]);


    React.useEffect(() => {
      balancesRequest().then(data => {
        const [status, responseText] = data
        setIsLoaded(true);
        setBalances(responseText);
        console.log(responseText);
      })

      claimableBalancesRequest().then(data => {
        const [status, responseText] = data
        setIsLoaded(true);
        setClaimableBalances(responseText);
        console.log(responseText);
      })

      operationsRequest().then(data => {
        const [status, responseText] = data
        setIsLoaded(true);
        setOperations(responseText);
        console.log(responseText);
      })


    }, []);


    return (
      <div>
      <Navbar loggedIn={true}/>
      <div className={classes.thatDiv}>
        <Grid container className={classes.root} spacing={0} justify="center" alignItems="center" direction="column">
            <Grid container item>
            <Typography variant="h4" component="h4" className={classes.title}>Balances</Typography>
                <Grid item container direction="row" justify="left" alignItems="left">
                  {
                    
                    balances.map((object) => 
                    <Grid item xs={3} sm={balances.length/3} className={classes.card}>
                      <BalanceCard asset={object.asset_code} balance={object.balance}/>
                    </Grid>
                      
                  )
                  
                  }
                </Grid> 
            </Grid>
            <Grid container item > 
            <Typography variant="h4" component="h4" className={classes.title}>Claimable Balances</Typography>
              <ClaimableBalances data={claimableBalances}/>
            </Grid>

            <Grid container item >
              <Typography variant="h4" component="h4" className={`${classes.title} ${classes.lastTitle}`}>Past operations</Typography>
              <Operations data={operations} />
            </Grid>

        </Grid>
      </div>
      </div>
    )
}