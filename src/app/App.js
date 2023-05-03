import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Main from './layouts/main';
import Login from './layouts/login';
import NavBar from './components/navBar';
import Users from './layouts/users';

function App() {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route exact path = '/' component = {Main} />
                <Route path = '/login' component = {Login} />
                <Route path = '/users/:userId?' component = {Users} />
                <Redirect to = '/' />
            </Switch>

        </div>
    );
};

export default App;
