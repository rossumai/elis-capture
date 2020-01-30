import { Action } from 'redux';
import Immutable, { Immutable as ImmutableType } from 'seamless-immutable';
import { UPLOAD_DOCUMENTS, UPLOAD_DOCUMENTS_FULFILLED } from './actions';

export type State = ImmutableType<{
  uploading: boolean;
}>;

const initialState: State = Immutable({ uploading: false });

function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case UPLOAD_DOCUMENTS:
      return state.set('uploading', true);

    case UPLOAD_DOCUMENTS_FULFILLED:
      return state.set('uploading', false);
    default:
      return state;
  }
}

export default reducer;
