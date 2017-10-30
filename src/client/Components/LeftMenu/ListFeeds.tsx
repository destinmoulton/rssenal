import { OrderedMap } from "immutable";
import * as React from "react";
import { connect } from "react-redux";

import FeedItem from "./FeedItem";

import { IFeed, TFeedID, TFeedgroupID, TFeeds } from "../../interfaces";

interface IListFeedsProps {
    feeds: TFeeds;
    editFeed: (feed: IFeed)=>void;
    groupId: TFeedgroupID;
}

const ListFeeds = (props: IListFeedsProps)=>{
    const {
        editFeed,
        feeds,
        groupId
    } = props;

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