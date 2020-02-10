import { AsyncStorage } from 'react-native';
import { ActionsObservable, ofType } from 'redux-observable';
import { from } from 'rxjs';
import { catchError, map, mergeMap, pluck } from 'rxjs/operators';
import { apiUrl } from '../../../constants/config';
import { authGetJSON, errorHandler } from '../../../lib/api';
import { Queue } from './reducer';

export const FETCH_QUEUES = 'FETCH_QUEUES';
export const FETCH_QUEUES_FULFILLED = 'FETCH_QUEUES_FULFILLED';
export const SELECT_QUEUE = 'SELECT_QUEUE';
export const SELECT_QUEUE_FULFILLED = 'SELECT_QUEUE_FULFILLED';

type actionTypeT =
  | 'FETCH_QUEUES'
  | 'FETCH_QUEUES_FULFILLED'
  | 'SELECT_QUEUE'
  | 'SELECT_QUEUE_FULFILLED';

type ack<typeT extends actionTypeT, payloadT> = {
  type: typeT;
  payload: payloadT;
};

export type actionT =
  | ack<'FETCH_QUEUES', {}>
  | ack<'FETCH_QUEUES_FULFILLED', { queues: Queue[] }>
  | ack<'SELECT_QUEUE', { index: number }>
  | ack<'SELECT_QUEUE_FULFILLED', {}>;

type fetchQueuesT = () => actionT;
export const fetchQueues: fetchQueuesT = () => ({
  type: FETCH_QUEUES,
  payload: {},
});

type selectQueueT = (index: number) => actionT;
export const selectQueue: selectQueueT = (index: number) => ({
  type: SELECT_QUEUE,
  payload: { index },
});

type selectQueueFulfilledT = () => actionT;
export const selectQueueFulfilled: selectQueueFulfilledT = () => ({
  type: SELECT_QUEUE_FULFILLED,
  payload: {},
});

type fetchQueuesFulfilledT = (queues: Queue[]) => actionT;
export const fetchQueuesFulfilled: fetchQueuesFulfilledT = (queues: Queue[]) => {
  return {
    type: FETCH_QUEUES_FULFILLED,
    payload: { queues },
  };
};

export const fetchQueuesEpic = (action$: ActionsObservable<actionT>) =>
  action$.pipe(
    ofType(FETCH_QUEUES),
    mergeMap(() =>
      authGetJSON(`${apiUrl}/queues?pageSize=15&page=1`, {}).pipe(
        // @ts-ignore
        // this type ignore comes from weak type of withToken function
        map(queues => fetchQueuesFulfilled(queues.results)),
        catchError(errorHandler),
      ),
    ),
  );

export const selectDefaultQueueEpic = (action$: ActionsObservable<actionT>) =>
  action$.pipe(
    ofType(FETCH_QUEUES_FULFILLED),
    mergeMap(() => from(AsyncStorage.getItem('QUEUE'))),
    map(index => Number(index) || 0),
    map(selectQueue),
  );

export const selectQueueEpic = (action$: ActionsObservable<actionT>) =>
  action$.pipe(
    ofType(SELECT_QUEUE),
    // @ts-ignore
    pluck('payload', 'index'), // the type inference for pluck seems to be not working, TODO possibly introduce custom pluck which infers the types
    mergeMap((index: number) => AsyncStorage.setItem('QUEUE', index.toString())),
    map(selectQueueFulfilled),
  );
