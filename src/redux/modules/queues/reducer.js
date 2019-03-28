/* @flow */
import Immutable, { type Immutable as ImmutableType } from 'seamless-immutable';
import { FETCH_QUEUES_FULFILLED, SELECT_QUEUE } from './actions';

export type Queue = {
  workspace: string,
  annotations: Array<string>,
  id: number,
  name: string,
  rirUrl: string,
  sessionTimeout: number,
  url: string,
  users: Array<string>,
  counts: Object
}

type State = ImmutableType<{
  queues: Array<Queue>,
  currentQueueIndex: number,
}>;
const initialState: State = Immutable({
  queues: [],
  currentQueueIndex: null,
});

function reducer(state: State = initialState, action: Object) {
  switch (action.type) {
    case FETCH_QUEUES_FULFILLED: {
      const { payload: { results } } = action;
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
