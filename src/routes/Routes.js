import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from "../components/pages/Home";

export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile/:apiKey" component={Home} />
    </Switch>
);
