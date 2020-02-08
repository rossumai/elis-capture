import { Reducer } from 'redux';
import Immutable, { Immutable as ImmutableType } from 'seamless-immutable';
import { actionT, UPLOAD_DOCUMENTS, UPLOAD_DOCUMENTS_FULFILLED } from './actions';

export type documentsT = ImmutableType<{
  uploading: boolean;
}>;

const initialState: documentsT = Immutable({ uploading: false });

const documentsReducer: Reducer<documentsT, actionT> = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_DOCUMENTS:
      return state.set('uploading', true);

    case UPLOAD_DOCUMENTS_FULFILLED:
      return state.set('uploading', false);
    default:
      return state;
  }
};

export default documentsReducer;
