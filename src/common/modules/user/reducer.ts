import { Action } from 'redux';
import Immutable, { Immutable as ImmutableType } from 'seamless-immutable';
import { LOGIN_USER_FULFILLED } from './actions';

type State = ImmutableType<{ loggedIn: boolean }>;
const initialState: State = Immutable({ loggedIn: false });

function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case LOGIN_USER_FULFILLED: {
      return state.set('loggedIn', true);
    }
    default: {
      return state;
    }
  }
}

export default reducer;
