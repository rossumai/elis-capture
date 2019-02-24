/* @flow */
import { AsyncStorage } from 'react-native';
import { from, of as _of } from 'rxjs';
import { pickBy, identity } from 'lodash';
import { ajax } from 'rxjs/ajax';
import { mergeMap, first } from 'rxjs/operators';
import { logoutUser } from '../redux/modules/user/actions';
import { displayMessage } from '../redux/modules/messages/actions';
import { TOKEN } from '../constants/config';

const authDefaultSettings = (token: string, settings: HeadersInit = {}) => pickBy({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Token ${token}`,
  ...settings,
}, identity);

const withToken = (fn: Function) =>
  from(AsyncStorage.getItem(TOKEN)).pipe(mergeMap(fn), first());

export const authPost = (url: string, body: any, settings: HeadersInit) =>
  withToken((token: string) =>
    ajax.post(url, body, authDefaultSettings(token, settings)));

export const authGetJSON = (url: string, settings: HeadersInit) =>
  withToken((token: string) =>
    ajax.getJSON(url, authDefaultSettings(token, settings)));

export const errorHandler = (response: Response) => {
  switch (response.status) {
    case 401: return _of(
      logoutUser(),
      displayMessage('You are no longer logged in'),
    );
    default: return _of(displayMessage('Terrible error occurred'));
  }
};
