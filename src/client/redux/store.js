import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk';

import feedGroupsReducer from './reducers/feedgroups.reducer';

const store = createStore(
  combineReducers({
    feedGroups: feedGroupsReducer
  }),
  applyMiddleware(
    thunk
  )
);

export default store;
