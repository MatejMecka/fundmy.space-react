import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useHistory } from "react-router-dom";
import logoutRequest from '../../requests/logout';
import Snackbar from '@material-ui/core/Snackbar';
import Link from '@material-ui/core/Link';
import Alert from '../../general/alert';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'left'
  },
}));

export default function Navbar(props) {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [message, setMessage] = React.useState('');
    const open = Boolean(anchorEl);
    const [open_alert, setOpen] = React.useState(false);

    const preventDefault = (event) => event.preventDefault();

    const handleChange = (event) => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const history = useHistory();
/*
    const logOut = () => {
      logoutRequest().then(response => {
        const [status, responseText] = response
        if(status){
            history.push('/authenticate')
        } else {
            setMessage(responseText)
            console.log('Message: ' + message)
            setOpen(true);
        }
    }).catch((error) => {
        console.log(error)
    })
    }*/

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
            <Link href="/dashboard" color="inherit" >
              FundMy.space
              </Link>
            </Typography>
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem component={Link} href={`/user`} >My Profile</MenuItem>
                  <MenuItem onClick={handleClose}>Settings</MenuItem>
                  
                </Menu>
              </div>
          </Toolbar>
        </AppBar>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
              { message }
          </Alert>
        </Snackbar>
      </div>
    );

}