import { createStore, combineReducers, applyMiddleware } from "redux";

import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import storage from "../lib/storage";

import authReducer from "./reducers/auth.reducer";
import entriesReducer from "./reducers/entries.reducer";
import filterReducer from "./reducers/filter.reducer";
import feedsReducer from "./reducers/feeds.reducer";
import foldersReducer from "./reducers/folders.reducer";
import messagesReducer from "./reducers/messages.reducer";
import settingsReducer from "./reducers/settings.reducer";

let middleware = applyMiddleware(thunk);

if (storage.has("redux-debug") && storage.get("redux-debug") === "on") {
    const logger = createLogger({
        collapsed: true
    });
    middleware = applyMiddleware(thunk, logger);
}

const store = createStore(
    combineReducers({
        authStore: authReducer,
        entriesStore: entriesReducer,
        filterStore: filterReducer,
        foldersStore: foldersReducer,
        feedsStore: feedsReducer,
        messagesStore: messagesReducer,
        settingsStore: settingsReducer
    }),
    middleware
);

export default store;
