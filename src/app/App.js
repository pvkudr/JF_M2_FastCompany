import React from 'react';
import Users from './layouts/Users';
import { Route, Switch } from 'react-router-dom';
import Main from './layouts/main';
import Login from './layouts/login';
import NavBar from './components/navBar';

function App() {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route exact path = '/' component = {Main} />
                <Route path = '/login' component = {Login} />
                <Route
                    path = '/users/:userId?'
                    render = {(props) => (<Users {...props} />)}
                />
            </Switch>

        </div>
    );
};

export default App;
