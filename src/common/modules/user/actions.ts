import AsyncStorage from '@react-native-community/async-storage';
import { ActionsObservable, ofType } from 'redux-observable';
import { from, of as _of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, mapTo, mergeMap, pluck } from 'rxjs/operators';
import { apiUrl, TOKEN } from '../../../constants/config';
import { displayMessage } from '../messages/actions';
import { changeRoute } from '../route/actions';

export type CredentialsBody = { username: string; password: string };
type Token = string;

const loginUrl = `${apiUrl}/auth/login`;
const settings = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_USER_FULFILLED = 'LOGIN_USER_FULFILLED';
export const VALIDATE_CREDENTIALS = 'VALIDATE_CREDENTIALS';
export const CHECK_TOKEN = 'CHECK_TOKEN';

type actionTypeT = 'LOGOUT_USER' | 'LOGIN_USER_FULFILLED' | 'VALIDATE_CREDENTIALS' | 'CHECK_TOKEN';

type ack<typeT extends actionTypeT, payloadT> = {
  type: typeT;
  payload: payloadT;
};

export type actionT =
  | ack<'LOGOUT_USER', {}>
  | ack<'LOGIN_USER_FULFILLED', { token: Token }>
  | ack<'VALIDATE_CREDENTIALS', { body: CredentialsBody }>
  | ack<'CHECK_TOKEN', {}>;

type logoutUserT = () => actionT;
export const logoutUser: logoutUserT = () => ({
  type: LOGOUT_USER,
  payload: {},
});

type loginUserFulfilledT = (token: Token) => actionT;
export const loginUserFulfilled: loginUserFulfilledT = (token: Token) => ({
  type: LOGIN_USER_FULFILLED,
  payload: { token },
});

type validateCredentialsT = (body: CredentialsBody) => actionT;
export const validateCredentials: validateCredentialsT = (body: CredentialsBody) => ({
  type: VALIDATE_CREDENTIALS,
  payload: { body },
});

type checkTokenT = () => actionT;
export const checkToken: checkTokenT = () => ({
  type: CHECK_TOKEN,
  payload: {},
});

export const checkTokenEpic = (action$: ActionsObservable<actionT>) =>
  action$.pipe(
    ofType(CHECK_TOKEN),
    mergeMap(() => from(AsyncStorage.getItem(TOKEN))),
    map((token: string | null) => (token ? loginUserFulfilled(token) : changeRoute('/login'))),
  );

export const validateCredentialsEpic = (action$: ActionsObservable<actionT>) =>
  action$.pipe(
    ofType(VALIDATE_CREDENTIALS),
    pluck('payload', 'body'),
    mergeMap(body =>
      ajax.post(loginUrl, body, settings).pipe(
        map(({ response: { key } }) => loginUserFulfilled(key)),
        catchError(() => _of(displayMessage('Incorrect credentials provided'))),
      ),
    ),
  );

export const loginUserFulfilledEpic = (action$: ActionsObservable<actionT>) =>
  action$.pipe(
    ofType(LOGIN_USER_FULFILLED),
    // @ts-ignore
    pluck('payload', 'token'), // the type inference for pluck seems to be not working, TODO possibly introduce custom pluck which infers the types
    mergeMap((token: Token) => AsyncStorage.setItem(TOKEN, token)),
    mapTo(changeRoute('/camera')),
  );

export const logoutUserEpic = (action$: ActionsObservable<actionT>) =>
  action$.pipe(
    ofType(LOGOUT_USER),
    mergeMap(() => from(AsyncStorage.removeItem(TOKEN))),
    map(() => changeRoute('/login')),
  );
