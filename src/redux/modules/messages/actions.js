import { map, delay } from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const DISPLAY_MESSAGE = 'DISPLAY_MESSAGE';
export const DISPLAY_MESSAGE_FULFILLED = 'DISPLAY_MESSAGE_FULFILLED';

export const displayMessage = message => ({
  type: DISPLAY_MESSAGE,
  payload: message,
});

export const displayMessageFulfilled = () => ({
  type: DISPLAY_MESSAGE_FULFILLED,
});

const displayMessageEpic = action$ =>
  action$.pipe(
    ofType(DISPLAY_MESSAGE),
    delay(4000),
    map(displayMessageFulfilled),
  );

export default displayMessageEpic;
