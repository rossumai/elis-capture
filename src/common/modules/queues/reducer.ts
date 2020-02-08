import { Reducer } from 'redux';
import Immutable, { Immutable as ImmutableType } from 'seamless-immutable';
import { actionT, FETCH_QUEUES_FULFILLED, SELECT_QUEUE } from './actions';

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

export type queueT = ImmutableType<{
  queues: Queue[];
  currentQueueIndex: number | null;
}>;
const initialState: queueT = Immutable({
  queues: [],
  currentQueueIndex: null,
});

const queueReducer: Reducer<queueT, actionT> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUEUES_FULFILLED: {
      const {
        payload: { queues },
      } = action;
      return state.set('queues', queues);
    }

    case SELECT_QUEUE:
      return state.set('currentQueueIndex', Number(action.payload.index));

    default: {
      return state;
    }
  }
};

export default queueReducer;
