/* @flow */
import { from, of as _of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  mergeMap,
  pluck,
  map,
  mapTo,
  catchError,
} from 'rxjs/operators';
import { AsyncStorage } from 'react-native';
import { combineEpics, ofType } from 'redux-observable';
import { changeRoute } from '../route/actions';
import { displayMessage } from '../messages/actions';
import { apiUrl, TOKEN } from '../../../constants/config';

type CredentialsBody = { username: string, password: string };
opaque type Token = string;

const loginUrl = `${apiUrl}/auth/login`;
const settings = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_USER_FULFILLED = 'LOGIN_USER_FULFILLED';
export const VALIDATE_CREDENTIALS = 'VALIDATE_CREDENTIALS';
export const CHECK_TOKEN = 'CHECK_TOKEN';

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const loginUserFulfilled = (token: Token) => ({
  type: LOGIN_USER_FULFILLED,
  payload: token,
});

export const validateCredentials = (body: CredentialsBody) => ({
  type: VALIDATE_CREDENTIALS,
  payload: body,
});

export const checkToken = () => ({
  type: CHECK_TOKEN,
});

const checkTokenEpic = action$ =>
  action$.pipe(
    ofType(CHECK_TOKEN),
    mergeMap(() => from(AsyncStorage.getItem(TOKEN))),
    map(token =>
      token
        ? loginUserFulfilled(token)
        : changeRoute('/login')),
  );

const validateCredentialsEpic = action$ =>
  action$.pipe(
    ofType(VALIDATE_CREDENTIALS),
    pluck('payload'),
    mergeMap(body => ajax.post(loginUrl, body, settings).pipe(
      map(({ response: { key } }) => loginUserFulfilled(key)),
      catchError(() => _of(displayMessage('Incorrect credentials provided'))),
    )),
  );

const loginUserFulfilledEpic = action$ =>
  action$.pipe(
    ofType(LOGIN_USER_FULFILLED),
    pluck('payload'),
    mergeMap(token => AsyncStorage.setItem(TOKEN, token)),
    mapTo(changeRoute('/camera')),
  );

const logoutUserEpic = action$ =>
  action$.pipe(
    ofType(LOGOUT_USER),
    mergeMap(() => from(AsyncStorage.removeItem(TOKEN))),
    map(() => changeRoute('/login')),
  );


export default combineEpics(
  checkTokenEpic,
  validateCredentialsEpic,
  loginUserFulfilledEpic,
  logoutUserEpic,
);
