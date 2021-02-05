import logo from './logo.svg';
import './App.css';
import Authentication from './components/authentication/authentication'
import Dashboard from './components/dashboard/dashboard';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import userInfo from './components/requests/userinfo';
import Navbar from './components/dashboard/elements/appbar';

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
 let status = false
  loggedIn().then(status =>{
    status = status
  });

  return (
    <Router>
      <div className="App">
        <Navbar loggedIn={status} />
      <Switch>
        <Route exact path="/" />
        <Route path="/dashboard" component={Dashboard} /> 
        <Route path="/authenticate" component={Authentication} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
