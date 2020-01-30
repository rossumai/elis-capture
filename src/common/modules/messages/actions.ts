import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export const DISPLAY_MESSAGE = 'DISPLAY_MESSAGE';
export const DISPLAY_MESSAGE_FULFILLED = 'DISPLAY_MESSAGE_FULFILLED';

export const displayMessage = (message: string) => ({
  type: DISPLAY_MESSAGE,
  payload: message,
});

export const displayMessageFulfilled = () => ({
  type: DISPLAY_MESSAGE_FULFILLED,
});

const displayMessageEpic = (action$: Observable<Action>) =>
  action$.pipe(ofType(DISPLAY_MESSAGE), delay(4000), map(displayMessageFulfilled));

export default displayMessageEpic;
