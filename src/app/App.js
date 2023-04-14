import React from 'react';
import AllContent from './components/allContent';
import { Route, Switch } from 'react-router-dom';
import Main from './layouts/main';
import Login from './layouts/login';
import NavBar from './components/navBar';
import UserPage from './components/userPage';

function App() {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route exact path = '/' component = {Main} />
                <Route path = '/login' component = {Login} />
                <Route exact path = '/users' component = {AllContent} />
                <Route
                    path = '/users/:userId?'
                    render = {(props) => (<UserPage {...props} />)}
                />
            </Switch>

        </div>
    );
};

export default App;
