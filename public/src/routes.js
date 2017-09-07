import React from 'react'
import { Route, IndexRoute } from 'react-router';

import App from './components/app';

import HomePage from './components/pages/home_page';
import NotFoundPage from './components/pages/not-found-page';

import Register from './components/auth/register';
import Login from './components/auth/login';
import Logout from './components/auth/logout';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="register" component={Register} />
        <Route path="login" component={Login} />
        <Route path="logout" component={Logout} />
        <Route path="*" component={NotFoundPage} />
    </Route>
);