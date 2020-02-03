import AsyncStorage from '@react-native-community/async-storage'; // depracated update to react-native-community
import { identity, pickBy } from 'lodash';
import { from, ObservableInput, of as _of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { first, mergeMap } from 'rxjs/operators';
import { displayMessage } from '../../../elis-capture/src/common/modules/messages/actions';
import { logoutUser } from '../../../elis-capture/src/common/modules/user/actions';
import { TOKEN } from '../../../elis-capture/src/constants/config';

type HeadersInit = {};

const authDefaultSettings = (token: string, settings = {}) =>
  pickBy(
    {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Token ${token}`,
      ...settings,
    },
    identity,
  );

const withToken = (fn: (value: string | null) => ObservableInput<any>) =>
  from(AsyncStorage.getItem(TOKEN)).pipe(mergeMap(fn), first());

export const authPost = (url: string, body: any, settings: HeadersInit) =>
  withToken((token: string | null) => {
    if (token) {
      return ajax.post(url, body, authDefaultSettings(token, settings));
    }
    return '';
  });

export const authGetJSON = (url: string, settings: HeadersInit) =>
  withToken((token: string | null) => {
    if (token) {
      return ajax.getJSON(url, authDefaultSettings(token, settings));
    }
    return '';
  });

export const errorHandler = (response: Response) => {
  switch (response.status) {
    case 401:
      return _of(logoutUser(), displayMessage('You are no longer logged in'));
    default:
      return _of(displayMessage('Terrible error occurred'));
  }
};
