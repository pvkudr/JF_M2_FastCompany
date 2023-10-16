import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Main from './layouts/main';
import Login from './layouts/login';
import NavBar from './components/ui/navBar';
import Users from './layouts/users';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './layouts/logOut';
import AppLoader from './components/ui/hoc/appLoader';

function App() {
    return (
        <div>
            <AppLoader>
                <NavBar/>
                    <Switch>
                        <Route exact path = '/' component = {Main} />
                        <Route path = '/login/:type?' component = {Login} />
                        <Route path= '/logout' component={LogOut} />
                        <ProtectedRoute path = '/users/:userId?/:edit?' component = {Users} />
                        <Redirect to = '/' />
                    </Switch>
                <ToastContainer/>
            </AppLoader>
        </div>
    );
};

export default App;
