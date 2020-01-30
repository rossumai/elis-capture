import { Action } from 'redux';
import { CHANGE_ROUTE } from './actions';

const reducer = (state: string = '/', action: Action) => (action.type === CHANGE_ROUTE ? action.payload : state);

export default reducer;
