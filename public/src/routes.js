import React from 'react'
import { Route, IndexRoute } from 'react-router';

// import App from './components/App';
import App from './components/app';

import NotFoundPage from './components/pages/not-found-page';

// Import authentication related pages
import Register from './components/auth/register';
import Login from './components/auth/login';
import Logout from './components/auth/logout';

// import SignIn from './components/SignIn';
// import SignUp from './cpomponents/SignUp';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={TodosIndex} />
        <Route path="register" component={Register} />
        <Route path="login" component={Login} />
        <Route path="logout" component={Logout} />
        {/* <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} /> */}
        <Route path="*" component={NotFoundPage} />
    </Route>
);