export const CHANGE_ROUTE = 'CHANGE_ROUTE';

type actionTypeT = 'CHANGE_ROUTE';

type ack<typeT extends actionTypeT, payloadT> = {
  type: typeT;
  payload: payloadT;
};

export type actionT = ack<'CHANGE_ROUTE', { route: routeT }>;

export type routeT = '/camera' | '/' | '/login';

type changeRouteT = (route: routeT) => actionT;
export const changeRoute: changeRouteT = (route: routeT) => ({
  type: CHANGE_ROUTE,
  payload: { route },
});
