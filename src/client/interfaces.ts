import { Map, OrderedMap } from "immutable";

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
}

export type TEntries = OrderedMap<TEntryID, IEntry>;

export type TFeedID = string;

export interface IFeed {
    _id: TFeedID;
    title: string;
    feedgroup_id: string;
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
    groups: Map<TFeedgroupID, number>;
}

export type TFeedgroupID = string;

export interface IFeedgroup {
    _id: TFeedgroupID;
    name: string;
    order: number;
}

export interface IFeedgroupAction {
    type: string;
    groupId?: TFeedgroupID;
    groups?: IFeedgroup[];
    group?: IFeedgroup;
}

export type TFeedgroups = OrderedMap<TFeedgroupID, IFeedgroup>;

export interface IFilter {
    id?: string;
    limit: string;
}
export interface IFilterAction {
    type: string;
    newFilter: object;
}

export interface ISettingsAction{
    type: string;
    setting_key: string;
    setting_value: any;
}


/** Redux Reducer Interfaces */

export interface IReducerStateEntries{
    entries: TEntries;
}

export interface IReducerStateFilter{
    filter: IFilter;    
}

export interface IReducerStateFeedgroups {
    groups: TFeedgroups;
    hasFeedGroups: boolean;
    isDeletingFeedGroup: boolean;
    isFetchingFeedGroups: boolean;
    isSavingFeedGroup: boolean;
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

export interface IRootStoreState {
    entries: IReducerStateEntries;
    feedgroups: IReducerStateFeedgroups;    
    feeds: IReducerStateFeeds;
    filter: IReducerStateFilter;
    settings: IReducerStateSettings;
}

export interface ISetting {
    key: string;
    name: string;
    type: string;
    value: any;
}