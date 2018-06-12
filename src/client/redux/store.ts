import { createStore, combineReducers, applyMiddleware } from "redux";
import { routerReducer } from "react-router-redux";
import thunk from "redux-thunk";

import authReducer from "./reducers/auth.reducer";
import entriesReducer from "./reducers/entries.reducer";
import filterReducer from "./reducers/filter.reducer";
import feedsReducer from "./reducers/feeds.reducer";
import foldersReducer from "./reducers/folders.reducer";
import messagesReducer from "./reducers/messages.reducer";
import settingsReducer from "./reducers/settings.reducer";

const store = createStore(
    combineReducers({
        authState: authReducer,
        entriesState: entriesReducer,
        filterState: filterReducer,
        foldersState: foldersReducer,
        feedsState: feedsReducer,
        messagesState: messagesReducer,
        settingsState: settingsReducer
    }),
    applyMiddleware(thunk)
);

export default store;
