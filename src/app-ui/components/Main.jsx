import React from 'react';
import { Route, Router } from 'react-router-dom';
import { ConnectedApp } from './App'
import { history } from '../util/history';

export const Main = ()=>(
    <Router history={history}>
            <div className="container mt-3">
                <div className="row">
                    <Route exact path="/" component={ConnectedApp} />
                </div>
            </div>
    </Router>
);