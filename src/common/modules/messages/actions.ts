import { ActionsObservable, ofType } from 'redux-observable';
import { delay, map } from 'rxjs/operators';

export const DISPLAY_MESSAGE = 'DISPLAY_MESSAGE';
export const DISPLAY_MESSAGE_FULFILLED = 'DISPLAY_MESSAGE_FULFILLED';

type actionTypeT = 'DISPLAY_MESSAGE' | 'DISPLAY_MESSAGE_FULFILLED';

type ack<typeT extends actionTypeT, payloadT> = {
  type: typeT;
  payload: payloadT;
};

export type actionT =
  | ack<'DISPLAY_MESSAGE', { message: string }>
  | ack<'DISPLAY_MESSAGE_FULFILLED', {}>;

type displayMessageT = (message: string) => actionT;
export const displayMessage: displayMessageT = (message: string) => ({
  type: DISPLAY_MESSAGE,
  payload: { message },
});

type displayMessageFulfilledT = () => actionT;
export const displayMessageFulfilled: displayMessageFulfilledT = () => ({
  type: DISPLAY_MESSAGE_FULFILLED,
  payload: {},
});

const displayMessageEpic = (action$: ActionsObservable<actionT>) =>
  action$.pipe(ofType(DISPLAY_MESSAGE), delay(4000), map(displayMessageFulfilled));

export default displayMessageEpic;
