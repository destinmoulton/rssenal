import { createStore, combineReducers, applyMiddleware } from "redux";

import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import authReducer from "./reducers/auth.reducer";
import entriesReducer from "./reducers/entries.reducer";
import filterReducer from "./reducers/filter.reducer";
import feedsReducer from "./reducers/feeds.reducer";
import foldersReducer from "./reducers/folders.reducer";
import messagesReducer from "./reducers/messages.reducer";
import settingsReducer from "./reducers/settings.reducer";

const logger = createLogger({
    collapsed: true
});
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
    applyMiddleware(logger, thunk)
);

export default store;
