/* @flow */
import { CHANGE_ROUTE } from './actions';

const reducer = (state: string = '/', action: Object) =>
  action.type === CHANGE_ROUTE
    ? action.payload
    : state;

export default reducer;
