import AsyncStorage from '@react-native-community/async-storage';
import { Action } from 'redux';
import { combineEpics, ofType } from 'redux-observable';
import { from, Observable } from 'rxjs';
import { catchError, map, mergeMap, pluck } from 'rxjs/operators';
import { apiUrl } from '../../../constants/config';
import { authGetJSON, errorHandler } from '../../../lib/api';

export const FETCH_QUEUES = 'FETCH_QUEUES';
export const FETCH_QUEUES_FULFILLED = 'FETCH_QUEUES_FULFILLED';
export const SELECT_QUEUE = 'SELECT_QUEUE';
export const SELECT_QUEUE_FULFILLED = 'SELECT_QUEUE_FULFILLED';

export const fetchQueues = () => ({
  type: FETCH_QUEUES,
});

export const selectQueue = (index: number) => ({
  type: SELECT_QUEUE,
  payload: { index },
});

export const selectQueueFulfilled = () => ({
  type: SELECT_QUEUE_FULFILLED,
});

export const fetchQueuesFulfilled = payload => ({
  type: FETCH_QUEUES_FULFILLED,
  payload,
});

const fetchQueuesEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(FETCH_QUEUES),
    mergeMap(() =>
      authGetJSON(`${apiUrl}/queues?pageSize=15&page=1`, {}).pipe(
        map(fetchQueuesFulfilled),
        catchError(errorHandler),
      ),
    ),
  );

const selectDefaultQueueEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(FETCH_QUEUES_FULFILLED),
    mergeMap(() => from(AsyncStorage.getItem('QUEUE'))),
    map(index => index || '0'),
    map(selectQueue),
  );

const selectQueueEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(SELECT_QUEUE),
    pluck('payload', 'index'),
    mergeMap((index: string) => from(AsyncStorage.setItem('QUEUE', index))),
    map(selectQueueFulfilled),
  );

export default combineEpics(selectDefaultQueueEpic, fetchQueuesEpic, selectQueueEpic);
