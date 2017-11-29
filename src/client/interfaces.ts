import { List, Map, OrderedMap } from "immutable";

/** Redux Interfaces */
export interface IDispatch {
    <R>(asyncAction: (dispatch: IDispatch, getState: () => IRootStoreState) => R): R;
    <R>(asyncAction: (dispatch: IDispatch) => R): R;
    // (neverAction: (dispatch: Dispatch, getState: () => GetState) => never): never;
    (action: object): void;
    // (action: Thunk): ; // thunks in this app must return a promise
}

export interface IGetState {
    ():IRootStoreState;
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
}

export interface IEntriesAction {
    type: string;
    entries?: IEntry[];
    newEntry?: IEntry;
    showUnread?: boolean;
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
    feedId?: TFeedID;
    feed?: IFeed;
    feeds?: IFeed[];
    entries?: IEntry[];
}

export interface IFeedsUnreadMap {
    feeds: Map<TFeedID, number>;
    folders: Map<TFolderID, number>;
}


/** Filter Interfaces */

export interface IFilter {
    id?: string;
    limit: string;
}
export interface IFilterAction {
    type: string;
    newFilter: object;
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
    folderId?: TFolderID;
    folders?: IFolder[];
    folder?: IFolder;
}

/** Messages Interfaces */
export interface IMessage {
    message: string;
    type: string;
    uid?: number;
    onRemove?: (message:IMessage)=>void;
    position?: "br" | "tr" | "tl" | "tc" | "bl" | "bc";
}

export type TMessages = List<IMessage>;

export interface IMessageAction {
    type: string;
    message?: IMessage;
}

/** Redux Reducer Interfaces */

export interface IReducerStateEntries{
    entries: TEntries;
    isGettingEntries: boolean;
}

export interface IReducerStateFeeds {
    feeds: TFeeds;
    unreadMap: IFeedsUnreadMap;
    isAddingFeed: boolean;
    isUpdatingFeed: boolean;
}

export interface IReducerStateSettings {
    settings: ISetting[];
}

export interface IReducerStateFilter{
    filter: IFilter;    
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
    entries: IReducerStateEntries;
    feeds: IReducerStateFeeds;
    filter: IReducerStateFilter;
    folders: IReducerStateFolders;    
    messages: IReducerStateMessages;
    settings: IReducerStateSettings;
}

/** Settings Interfaces */

export interface ISetting {
    key: string;
    name: string;
    type: string;
    value: any;
}

export interface ISettingsAction{
    type: string;
    setting_key: string;
    setting_value: any;
}
