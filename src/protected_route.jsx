import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import userInfo from './components/requests/userinfo';

export default function PrivateRoute({ component: Component, ...rest }) {
    let [authenticated, setStatus] = React.useState(null)

    React.useEffect(() => {
        userInfo().then(response => {
            const [status, responseText] = response

            console.log("PRIVATE ROUTE")
            console.log(responseText)

            if(status){
                setStatus(true)
            } else {
                setStatus(false)
            }
        }).catch((error) => { 
            console.log(error)
        })
    }, [])

    console.log(authenticated)


    return (
        <Route {...rest} render={(props) => (
            authenticated === true
            ? <Component {...props} />
            : <Redirect to='/authenticate' />
        )} />
    )
};