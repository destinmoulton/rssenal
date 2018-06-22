import { List, Map, OrderedMap, Set } from "immutable";
import { Notification } from "react-notification-system";
/** Redux Interfaces */
export interface IDispatch {
    <R>(
        asyncAction: (dispatch: IDispatch, getState: () => IRootStoreState) => R
    ): R;
    <R>(asyncAction: (dispatch: IDispatch) => R): R;
    // (neverAction: (dispatch: Dispatch, getState: () => GetState) => never): never;
    (action: object): void;
    // (action: Thunk): ; // thunks in this app must return a promise
}

export interface IGetState {
    (): IRootStoreState;
}

export interface IAuthAction {
    type: string;
    username?: string;
    password?: string;
    message?: string;
}

export type TEntryID = string;

export interface IEntry {
    _id: TEntryID;
    feed_id: string;
    guid: string;
    title: string;
    link: string;
    creator: string;
    content: string;
    content_snippet: string;
    publish_date: string;
    has_read: boolean;
    feedTitle?: string;
    timeAgo?: string;
}

export interface IEntriesAction {
    type: string;
    entries?: TEntries;
}

export type TEntries = OrderedMap<TEntryID, IEntry>;

/** Feeds Interfaces & Types */

export type TFeedID = string;

export interface IFeed {
    _id: TFeedID;
    title: string;
    folder_id: string;
    description: string;
    link: string;
    creation_date: string;
    last_updated: string;
}

export type TFeeds = OrderedMap<TFeedID, IFeed>;

export interface IFeedsAction {
    type: string;
    feeds?: TFeeds;
    unreadMap?: IFeedsUnreadMap;
}

export type TUnreadMapFeeds = Map<TFeedID, number>;
export type TUnreadMapFolders = Map<TFolderID, number>;
export interface IFeedsUnreadMap {
    entriesCounted: Set<TFeedID>;
    feeds: TUnreadMapFeeds;
    folders: TUnreadMapFolders;
}

/** Filter Interfaces */

export interface IFilter {
    id?: string;
    limit: string;
}
export interface IFilterAction {
    type: string;
    newFilter?: object;
    filterTitle?: string;
    filteredEntries?: TEntries;
}

/** Folders Interfaces & Types */

export type TFolderID = string;

export interface IFolder {
    _id: TFolderID;
    name: string;
    order: number;
}

export type TFolders = OrderedMap<TFolderID, IFolder>;

export interface IFolderAction {
    type: string;
    folders?: TFolders;
}

/** Messages Interfaces */
export interface IMessage {
    message: string;
    level: "error" | "warning" | "info" | "success";
    uid?: number;
    onRemove?: (message: IMessage) => void;
    position?: "br" | "tr" | "tl" | "tc" | "bl" | "bc";
}

export type TMessages = List<IMessage>;

export interface IMessageAction {
    type: string;
    messages: List<IMessage>;
    lastUID?: number;
}

/** Redux Reducer Interfaces */

export interface IReducerStateAuth {
    authenticationError: string;
    isAuthorized: boolean;
    isValidatingToken: boolean;
}

export interface IReducerStateEntries {
    entries: TEntries;
}

export interface IReducerStateFeeds {
    feeds: TFeeds;
    unreadMap: IFeedsUnreadMap;
    isAddingFeed: boolean;
    isUpdatingFeed: boolean;
}

export interface IReducerStateSettings {
    settings: TSettings;
}

export interface IReducerStateFilter {
    filter: IFilter;
    filterTitle: string;
    filteredEntries: TEntries;
}

export interface IReducerStateFolders {
    folders: TFolders;
    hasFolders: boolean;
    isDeletingFolder: boolean;
    isFetchingFolders: boolean;
    isSavingFolder: boolean;
}

export interface IReducerStateMessages {
    messages: TMessages;
    lastUID: 0;
}

export interface IRootStoreState {
    authStore: IReducerStateAuth;
    entriesStore: IReducerStateEntries;
    feedsStore: IReducerStateFeeds;
    filterStore: IReducerStateFilter;
    foldersStore: IReducerStateFolders;
    messagesStore: IReducerStateMessages;
    settingsStore: IReducerStateSettings;
}

/** Settings Interfaces */

export interface ISetting {
    name: string;
    type: string;
    refresh_entries_on_change: boolean;
    value: any;
}

export type TSettings = Map<string, ISetting>;

export interface ISettingsAction {
    type: string;
    settings?: TSettings;
}
