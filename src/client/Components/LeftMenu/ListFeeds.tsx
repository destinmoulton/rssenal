import { OrderedMap } from "immutable";
import * as React from "react";
import { connect } from "react-redux";

import FeedItem from "./FeedItem";

import { IFeed, TFeedID, TFeedgroupID, TFeeds } from "../../interfaces";

interface IListFeeds {
    feeds: TFeeds;
    editFeed: (feed: IFeed)=>void;
    groupId: TFeedgroupID;
}

const ListFeeds = (props: IListFeeds)=>{
    const {
        editFeed,
        feeds,
        groupId
    } = this.props;

    const feedList = feeds.filter((feed: IFeed)=>{
        return (feed.feedgroup_id === groupId);
    }).map((feed: IFeed)=>{
        return <FeedItem key={feed._id} feed={feed} editFeed={editFeed}/>;
    });
    
    return (
        <div>
            {feedList}
        </div>
    );
}

export default ListFeeds;