import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 16,
    textAlign: 'left'
  },
  pos: {
    marginBottom: 12
  },
  value: {
    textAlign: 'left',
    fontSize: 48
  }
});

export default function BalanceCard(props) {
  const classes = useStyles();

  return (
    <Box width="15%">
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom  
          >
            <b>{props.asset}</b>
          </Typography>
          <Typography variant="h5" component="h2" className={classes.value}>
            {props.balance}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
