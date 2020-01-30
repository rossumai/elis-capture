import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import documentsEpic from './modules/documents/actions';
import documentsReducer from './modules/documents/reducer';
import messagesEpic from './modules/messages/actions';
import messagesReducer from './modules/messages/reducer';
import queuesEpic from './modules/queues/actions';
import queuesReducer from './modules/queues/reducer';
import routeReducer from './modules/route/reducer';
import userEpic from './modules/user/actions';
import userReducer from './modules/user/reducer';

const reducers = {
  user: userReducer,
  documents: documentsReducer,
  messages: messagesReducer,
  route: routeReducer,
  queues: queuesReducer,
};

const epics = combineEpics(userEpic, queuesEpic, documentsEpic, messagesEpic);

const epicMiddleware = createEpicMiddleware();

const store = createStore(combineReducers(reducers), applyMiddleware(logger, epicMiddleware));

epicMiddleware.run(epics);

export default store;
