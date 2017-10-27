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
}

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

export interface IFeedsAction {
    type: string;
    feedId?: TFeedID;
    feed?: IFeed;
    feeds?: IFeed[];
    entries?: IEntry[];
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

export interface IFilterAction {
    type: string;
    newFilter: object;
}

export interface ISettingsAction{
    type: string;
    setting_key: string;
    setting_value: any;
}