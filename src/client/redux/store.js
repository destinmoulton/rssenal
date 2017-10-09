import { createStore, combineReducers, applyMiddleware } from "redux"
import { routerReducer } from "react-router-redux"
import thunk from "redux-thunk";

import entriesReducer from "./reducers/entries.reducer";
import filterReducer from "./reducers/filter.reducer";
import feedsReducer from "./reducers/feeds.reducer";
import feedGroupsReducer from "./reducers/feedgroups.reducer";

const store = createStore(
  combineReducers({
    entries: entriesReducer,
    filter: filterReducer,
    feedgroups: feedGroupsReducer,
    feeds: feedsReducer
  }),
  applyMiddleware(
    thunk
  )
);

export default store;
