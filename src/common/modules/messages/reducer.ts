import { Action } from 'redux';
import Immutable, { Immutable as ImmutableType } from 'seamless-immutable';
import { DISPLAY_MESSAGE, DISPLAY_MESSAGE_FULFILLED } from './actions';

export type Message = { show: boolean; text: string };
export type State = ImmutableType<Message>;

const initialState: State = Immutable({ show: false, text: '' });

function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case DISPLAY_MESSAGE:
      return state.set('text', action.payload).set('show', true);

    case DISPLAY_MESSAGE_FULFILLED:
      return initialState;

    default:
      return state;
  }
}

export default reducer;
