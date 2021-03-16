import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../../general/alert';
import Button from '@material-ui/core/Button';

import albedo from '@albedo-link/intent'

export default function PaymentForm(props) {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState(false);

        const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const onSubmit = () => {
        albedo.publicKey({
            token: 'sRqeood+3eD9SO8iDlLqIp+T0D3b+rjUAKhlyfSAk2Y='
        }).then(async(res) => {
            console.log(res.pubkey, res.signed_message, res.signature)
            props.onChange(res.pubkey)
        }, error => {
            console.error('rejected')
            setMessage(`${error.message}`)
            setOpen(true)
        })
    }

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <Typography variant="subtitle1">
            FundMy.Space uses Albedo to request transaction signing or identity verification without exposing your secret key.

        </Typography>
        </Grid>
        <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        onClick={onSubmit}
    >
        Get Public Key with Albedo
    </Button>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
            { message }
        </Alert>
    </Snackbar>
    </React.Fragment>
  );
}