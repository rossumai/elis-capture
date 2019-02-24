import { from } from 'rxjs';
import {
  map,
  mergeMap,
  pluck,
  catchError,
  zip,
} from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { AsyncStorage } from 'react-native';
import { authGetJSON, errorHandler } from '../../../lib/api';
import { apiUrl, QUEUE } from '../../../constants/config';

export const FETCH_QUEUES = 'FETCH_QUEUES';
export const FETCH_QUEUES_FULFILLED = 'FETCH_QUEUES_FULFILLED';
export const SELECT_QUEUE = 'SELECT_QUEUE';
export const SELECT_QUEUE_FULFILLED = 'SELECT_QUEUE_FULFILLED';

export const fetchQueues = () => ({
  type: FETCH_QUEUES,
});

export const selectQueue = index => ({
  type: SELECT_QUEUE,
  payload: { index },
});

export const selectQueueFulfilled = () => ({
  type: SELECT_QUEUE_FULFILLED,
});

export const fetchQueuesFulfilled = (payload, meta) => ({
  type: FETCH_QUEUES_FULFILLED,
  payload,
  meta,
});

const fetchQueuesEpic = action$ =>
  action$.pipe(
    ofType(FETCH_QUEUES),
    mergeMap(() =>
      zip(
        authGetJSON(`${apiUrl}/queues?pageSize=15&page=1`),
        from(AsyncStorage.getItem(QUEUE)),
      ).pipe(catchError(errorHandler))),
    map(([, response, currentQueueIndex]) =>
      fetchQueuesFulfilled(response, { currentQueueIndex })),
  );

const selectQueueEpic = action$ =>
  action$.pipe(
    ofType(SELECT_QUEUE),
    pluck('payload', 'index'),
    mergeMap(index =>
      from(AsyncStorage.setItem(QUEUE, index))),
    map(selectQueueFulfilled),
  );

export default combineEpics(fetchQueuesEpic, selectQueueEpic);
