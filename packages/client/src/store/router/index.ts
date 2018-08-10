import { observable, computed } from 'mobx';
import createHistory from 'history/createBrowserHistory';
import { History, Location } from 'history';
import {
  routeMap, getLocationRegexes, routeAndParamsToLocation, getParamsByRoute, routes,
} from './config';
import { testRegex } from '../../common/regex';

type Iparams = { [key: string]: string };

export class Router {
  @observable activeRoute: routes;

  @observable params: Iparams;

  history: History;

  unlisten: Function;

  locationRegexes;

  constructor() {
    const history = createHistory();

    this.history = history;
    this.locationRegexes = getLocationRegexes();
    this.listen();

    this.handleRouteChange(history.location);
  }

  private handleRouteChange(location: Location) {
    const { locationRegexes } = this;

    const foundLocation = locationRegexes.find(({ regex }) => testRegex(regex, location.pathname));

    if (!foundLocation) {
      if (__DEV__) {
        console.warn(`Route for ${location.pathname} not found, check config.`);
      }

      // Go to default route if not found
      this.history.push('/');
    } else {
      const { route } = foundLocation;

      this.activeRoute = route;
      this.params = getParamsByRoute(route, location.pathname);
    }
  }

  private listen() {
    const {
      history,
    } = this;

    const unlisten = history.listen((location) => { this.handleRouteChange(location); });
    this.unlisten = unlisten;
  }

  changeRoute(route: routes, params: Iparams) {
    this.activeRoute = route;
    this.params = params;

    const newLocation = routeAndParamsToLocation(route, params);

    this.unlisten();
    this.history.push(newLocation);
    this.listen();
  }

  terminate() {
    this.unlisten();
  }

  @computed
  get routeData() {
    return routeMap[this.activeRoute];
  }
}
