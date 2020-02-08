import { Reducer } from 'redux';
import Immutable, { Immutable as ImmutableType } from 'seamless-immutable';
import { actionT, DISPLAY_MESSAGE, DISPLAY_MESSAGE_FULFILLED } from './actions';

export type Message = { show: boolean; text: string };
export type messageT = ImmutableType<Message>;

const initialState: messageT = Immutable({ show: false, text: '' });

const messagesReducer: Reducer<messageT, actionT> = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_MESSAGE:
      return state.set('text', action.payload.message).set('show', true);

    case DISPLAY_MESSAGE_FULFILLED:
      return initialState;

    default:
      return state;
  }
};

export default messagesReducer;
