import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import documentsEpic, { actionT as documentActionT } from './modules/documents/actions';
import documentsReducer, { documentsT } from './modules/documents/reducer';
import messagesEpic, { actionT as messageActionT } from './modules/messages/actions';
import messagesReducer, { messageT } from './modules/messages/reducer';
import {
  actionT as queueActionT,
  fetchQueuesEpic,
  selectDefaultQueueEpic,
  selectQueueEpic,
} from './modules/queues/actions';
import queuesReducer, { queueT } from './modules/queues/reducer';
import { actionT as routeActionT, routeT } from './modules/route/actions';
import routeReducer from './modules/route/reducer';
import {
  actionT as userActionT,
  checkTokenEpic,
  loginUserFulfilledEpic,
  logoutUserEpic,
  validateCredentialsEpic,
} from './modules/user/actions';
import userReducer, { userT } from './modules/user/reducer';

export type reduxStateT = {
  user: userT;
  documents: documentsT;
  messages: messageT;
  route: routeT;
  queues: queueT;
};

export type rootActionT =
  | routeActionT
  | queueActionT
  | userActionT
  | messageActionT
  | documentActionT;

const reducers = {
  user: userReducer,
  documents: documentsReducer,
  messages: messagesReducer,
  route: routeReducer,
  queues: queuesReducer,
};

const rootReducer = combineReducers<reduxStateT>(reducers);

const epics = combineEpics(
  validateCredentialsEpic,
  checkTokenEpic,
  loginUserFulfilledEpic,
  logoutUserEpic,
  fetchQueuesEpic,
  selectDefaultQueueEpic,
  selectQueueEpic,
  documentsEpic,
  messagesEpic,
);

const epicMiddleware = createEpicMiddleware();

const store = createStore(rootReducer, applyMiddleware(logger, epicMiddleware));

epicMiddleware.run(epics);

export default store;
