import { Action } from 'redux';
import Immutable, { Immutable as ImmutableType } from 'seamless-immutable';
import { FETCH_QUEUES_FULFILLED, SELECT_QUEUE } from './actions';

export type Queue = {
  workspace: string;
  annotations: string[];
  id: number;
  name: string;
  rirUrl: string;
  sessionTimeout: number;
  url: string;
  users: string[];
  counts: {};
};

type State = ImmutableType<{
  queues: Queue[];
  currentQueueIndex: number | null;
}>;
const initialState: State = Immutable({
  queues: [],
  currentQueueIndex: null,
});

function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case FETCH_QUEUES_FULFILLED: {
      const {
        payload: { results },
      } = action;
      return state.set('queues', results);
    }

    case SELECT_QUEUE:
      return state.set('currentQueueIndex', Number(action.payload.index));

    default: {
      return state;
    }
  }
}

export default reducer;
