import { Reducer } from 'redux';
import Immutable, { Immutable as ImmutableType } from 'seamless-immutable';
import { actionT, LOGIN_USER_FULFILLED } from './actions';

export type userT = ImmutableType<{ loggedIn: boolean }>;
const initialState: userT = Immutable({ loggedIn: false });

const userReducer: Reducer<userT, actionT> = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_FULFILLED: {
      return state.set('loggedIn', true);
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
