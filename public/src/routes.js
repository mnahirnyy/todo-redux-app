import React from 'react'
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './cpomponents/SignUp';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={TodosIndex} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
    </Route>
);