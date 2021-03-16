import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import Alert from '../../general/alert';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import albedo from '@albedo-link/intent'
const sdk = require("stellar-sdk");

export default function PaymentForm(props) {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [severity, setSeverity] = React.useState('');
    const [hiddenFields, setHiddenFields] = React.useState(false);
    const [select_value, setSelectValue] = React.useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const handleChange = (event) => {
        if(event.target.value == "other"){
            setHiddenFields(true)
        } else {
            setHiddenFields(false)
        }
        setSelectValue(event.target.value); 
    }

    const useStyles = makeStyles((theme) => ({
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        hidden: {
            display: hiddenFields ? 'display' : 'none'  
        }
      }));

    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (data) => {
        console.log(data)
        console.log(select_value)
        let asset = undefined;

        if(data["type"] == "click"){
            return
        }

        if(["GCKFBEIYV2U22IO2BJ4KVJOIP7XPWQGQFKKWXR6DOSJBV7STMAQSMTGG", "GCZ4N6QHS2XH62CDMDIOQRFL2X3NJWJNMU2OXEKE7SC2UEAENCPL65J3", "GCDNJUBQSX7AJWLJACMJ7I4BC3Z47BQUTMHEICZLE6MU4KQBRYG5JY6B"].indexOf(select_value) != -1){
            const pairs = {
                "GCKFBEIYV2U22IO2BJ4KVJOIP7XPWQGQFKKWXR6DOSJBV7STMAQSMTGG": "USD",
                "GCZ4N6QHS2XH62CDMDIOQRFL2X3NJWJNMU2OXEKE7SC2UEAENCPL65J3":"EUR",
                "GCDNJUBQSX7AJWLJACMJ7I4BC3Z47BQUTMHEICZLE6MU4KQBRYG5JY6B":"SRT"
            } // Ugly
            asset = new sdk.Asset(pairs[select_value], select_value)
        } 
        else if(select_value == 'native'){
            asset = sdk.Asset.native()
        } else {
            try{
                asset = new sdk.Asset(data["Asset"], data["Asset Issuer"])
            } catch (err) {
                setSeverity("error")
                setMessage(`Asset information incomplete! Make sure you filled out all fields.`)
                setOpen(true)   
                return
            }
            
        }

        console.log(props.data["public_key"])
        albedo.publicKey({
            token: 'sRqeood+3eD9SO8iDlLqIp+T0D3b+rjUAKhlyfSAk2Y='
        }).then(async(res) => {
            console.log(res.pubkey, res.signed_message, res.signature)

            var server = new sdk.Server('https://horizon-testnet.stellar.org');
            const account = await server.loadAccount(res.pubkey);
            const fee = await server.fetchBaseFee();
            let transaction = undefined
            try {
                transaction = new sdk.TransactionBuilder(account, { fee, networkPassphrase: sdk.Networks.TESTNET })
            .addOperation(
                // this operation funds the new account with XLM
                sdk.Operation.createClaimableBalance({
                    claimants: [
                        new sdk.Claimant(`${props.data["public_key"]}`, sdk.Claimant.predicateUnconditional()),
                    ],
                    asset: asset,
                    amount: `${data['Amount']}`
                })
            )
            .setTimeout(30)
            .build();
        } catch (e) {
            setSeverity("error")
            setMessage(`Failed to build transaction! ${e}`)
            setOpen(true) 
            return
        }

        albedo.tx({
            xdr: `${transaction.toXDR()}`,
            network: 'testnet',
            submit: true
        })
            .then(res => 
                {
                    console.log(res.xdr, res.tx_hash, res.signed_envelope_xdr, res.network, res.result)
                    setSeverity("success")
                    setMessage(`Transfer successful! You can view the transaction at: https://stellar.expert/explorer/testnet/tx/${res.tx_hash}`)
                    setOpen(true)
                }).catch(res => {
                    setSeverity("error")
                    setMessage(`Transaction failed! ${res["message"]}`)
                    setOpen(true)
                })
                
        }).catch(res => {
            setSeverity("error")
            setMessage(`Transaction failed! ${res["message"]}`)
            setOpen(true)
        })

        
    };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
    <FormControl variant="filled" className={classes.formControl}>
    <InputLabel id="demo-simple-select">Asset</InputLabel>
    <Select
          labelId="demo-simple-select-outlined-label"
          id="asseet_select"
          value={select_value}
          onChange={handleChange}
          label="Asset"
          name="Asset-select"
          inputRef={register({ required: true, name: "select_asset"})}
        >
          <MenuItem value="native">
            <em>XLM</em>
          </MenuItem>
          <MenuItem key="USD" value={"GCKFBEIYV2U22IO2BJ4KVJOIP7XPWQGQFKKWXR6DOSJBV7STMAQSMTGG"}>USD</MenuItem>
          <MenuItem key="EUR" value={"GCZ4N6QHS2XH62CDMDIOQRFL2X3NJWJNMU2OXEKE7SC2UEAENCPL65J3"}>EUR</MenuItem>
          <MenuItem key="SRT" value={"GCDNJUBQSX7AJWLJACMJ7I4BC3Z47BQUTMHEICZLE6MU4KQBRYG5JY6B"}>SRT</MenuItem>
          <MenuItem value={"other"}>Other</MenuItem>
        </Select>
    </FormControl>
    <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="username"
        label="Asset"
        name="Asset"
        autoComplete="asset"
        autoFocus
        className={classes.hidden}
        inputRef={register({ required: false})}
    />
    <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        name="Asset Issuer"
        label="Asset Issuer"
        type="text"
        id="asset_issuer"
        autoComplete="asset_issuer"
        className={classes.hidden}
        inputRef={register({ required: false})}
    />
    <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="Amount"
        label="Amount"
        type="number"
        id="amount"
        autoComplete="amount"
        inputRef={register({ required: true})}
    />
    <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={onSubmit}
    >
        Fund with Albedo
    </Button>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
            { message }
        </Alert>
    </Snackbar>
    </form>
            
  );
}
