import { startRouter } from 'mobx-router';
import { views } from './views';

export { RouterStore as Router } from 'mobx-router';
export const start = (routerStoreParent) => {
  startRouter(views, routerStoreParent);
};
