import React from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';
import { HelloWorld } from './hello-world';

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HelloWorld} />
    </Switch>
  </BrowserRouter>
);
