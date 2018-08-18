import { observable, computed, action } from 'mobx';
import { Router, start as startRouter } from './router';

export class Store {
  @observable
  public name = 'Programmer';

  private router: Router;


  constructor() {
    this.router = new Router();
    startRouter(this);
  }

  @action setName(name: string) {
    this.name = name;
  }

  @computed get activeComponent() {
    return this.router.routeData.Component;
  }
}

export const store = new Store();

if (__DEV__) {
  (window as any).store = store;
  (window as any).Store = Store;
}
