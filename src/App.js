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
import SetupPage from './components/setup/setup';
import SettingsPage from './components/settings/settings';
import Page404 from './components/error_pages/404';
import PrivateRoute from './protected_route';

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

  const username = ""

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <div className="App">
      <Switch>
        <PrivateRoute exact path="/dashboard" component={() => <Dashboard username={username} /> } />
        <PrivateRoute exact path="/authenticate" component={Authentication} />
        <PrivateRoute path="/user/:username?" component={ProfilePage} />
        <PrivateRoute exact path="/settings" component={SettingsPage} />
        <PrivateRoute exact path="/setup" component={() => <SetupPage username={username}/>} />
        <Route exact path="/" />
        <Route component={Page404} />
      </Switch>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
