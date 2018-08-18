import React from 'react';
import { Route } from 'mobx-router';
import { HelloWorld } from '../../container/hello-world';

export const views = {
  home: new Route({
    path: '/',
    component: <HelloWorld />,
  }),
};
