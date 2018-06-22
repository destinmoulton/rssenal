import { Map, OrderedMap, Set } from "immutable";
import * as Types from "../types";

export const AUTH_INITIAL_STATE: Types.IReducerStateAuth = {
    authenticationError: "",
    isAuthorized: false,
    isValidatingToken: false
};

export const ENTRIES_INITIAL_STATE: Types.IReducerStateEntries = {
    entries: OrderedMap<Types.TEntryID, Types.IEntry>()
};

export const FEEDS_INITIAL_UNREAD_MAP: Types.IFeedsUnreadMap = {
    entriesCounted: Set<Types.TFeedID>(),
    feeds: Map<Types.TFeedID, number>(),
    folders: Map<Types.TFolderID, number>()
};

export const FEEDS_INITIAL_STATE: Types.IReducerStateFeeds = {
    feeds: OrderedMap<Types.TFeedID, Types.IFeed>(),
    unreadMap: FEEDS_INITIAL_UNREAD_MAP,
    isAddingFeed: false,
    isUpdatingFeed: false
};
