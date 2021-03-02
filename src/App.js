import React from 'react';
import logo from './logo.svg';
import './App.css';
import Authentication from './components/authentication/authentication'
import Dashboard from './components/dashboard/dashboard';
import ProfilePage from './components/profile/profile';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import userInfo from './components/requests/userinfo';
import Navbar from './components/dashboard/elements/appbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

function loggedIn(){
    return userInfo().then(response => {
        const [status, responseText] = response
        if(status){
            return true
        } else {
            return false
        }
    }).catch((error) => { 
        console.log(error)
    })
}

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );


 let status = false
  loggedIn().then(status =>{
    status = status
  });

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <div className="App">
      <Switch>
        <Route exact path="/" />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/authenticate" component={Authentication} />
        <Route path="/user/:username" component={ProfilePage} />
      </Switch>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
