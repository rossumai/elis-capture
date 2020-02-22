import { Reducer } from 'redux';
import { actionT, CHANGE_ROUTE, routeT } from './actions';

const initialState = '/';

const routeReducer: Reducer<routeT, actionT> = (state = initialState, action) =>
  action.type === CHANGE_ROUTE ? action.payload.route : state;

export default routeReducer;
