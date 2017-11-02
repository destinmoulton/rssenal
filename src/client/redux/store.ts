import { createStore, combineReducers, applyMiddleware } from "redux"
import { routerReducer } from "react-router-redux"
import thunk from "redux-thunk";

import entriesReducer from "./reducers/entries.reducer";
import filterReducer from "./reducers/filter.reducer";
import feedsReducer from "./reducers/feeds.reducer";
import foldersReducer from "./reducers/folders.reducer";
import settingsReducer from "./reducers/settings.reducer";

const store = createStore(
  combineReducers({
    entries: entriesReducer,
    filter: filterReducer,
    folders: foldersReducer,
    feeds: feedsReducer,
    settings: settingsReducer
  }),
  applyMiddleware(
    thunk
  )
);

export default store;
