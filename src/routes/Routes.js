import React from 'react';
import Radicals from "../components/pages/Radicals";
import {Switch, Route} from 'react-router-dom';
import Home from "../components/pages/Home";
import Vocabulary from "../components/pages/Vocabulary";
import Kanji from "../components/pages/Kanji";

export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:apiKey" component={Home} />
        <Route path="/radicals/:apiKey" component={Radicals}/>
        <Route path="/radicals" component={Radicals}/>
        <Route path="/kanji" component={Kanji}/>
        <Route path="/kanji/:apiKey" component={Kanji}/>
        <Route path="/vocabulary" component={Vocabulary}/>
        <Route path="/vocabulary/:apiKey" component={Vocabulary}/>
    </Switch>
);
