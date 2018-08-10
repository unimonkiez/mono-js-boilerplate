import { HelloWorld } from 'src/container/hello-world';
import { getArrayByEnum } from 'src/common/iterate-enum';
import { runRegex } from 'src/common/regex';

export enum routes {
  homepage,
}


export type Route = {
  Component: any,
  location: string,
};

export const routeMap: { [key in routes]: Route } = {
  [routes.homepage]: {
    Component: HelloWorld,
    location: '/',
  },
};

export const getLocationRegexes = () => getArrayByEnum(routes)
  .map((route) => {
    const { location } = routeMap[route];

    return {
      regex: new RegExp(`^${
        location.replace(/[^/]{1,}/g, '[^/]{1,}')
      }$`,
      'g',
      ),
      route,
    };
  });

export const getParamsByRoute = (route: number, locationWithParams: string) => {
  const { location } = routeMap[route];

  const locationRegex = new RegExp(`^${
    location.replace(/[^/]{1,}/g, '([^/]{1,})')
  }$`,
  'g',
  );

  const paramNames = runRegex(locationRegex, location)
    .map(paramNameWithSign => paramNameWithSign.substr(1));

  const paramValues = runRegex(locationRegex, locationWithParams);

  const params = paramNames.reduce((obj, paramName, paramIndex) => ({
    ...obj,
    [paramName]: paramValues[paramIndex],
  }), {});

  return params;
};

export const routeAndParamsToLocation = (route: number, params: Object) => {
  const { location } = routeMap[route];

  const locationWithParams = location.replace(
    /\$[a-zA-Z0-9]{1,}/g,
    (paramNameWithSign) => {
      const paramName = paramNameWithSign.substr(1);
      return params[paramName];
    },
  );

  return locationWithParams;
};
