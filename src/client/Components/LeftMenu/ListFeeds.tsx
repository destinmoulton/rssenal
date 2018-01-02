import { OrderedMap } from "immutable";
import * as React from "react";
import { connect } from "react-redux";

import FeedItem from "./FeedItem";

import { IFeed, TFeedID, TFolderID, TFeeds } from "../../interfaces";

interface IListFeedsProps {
    feeds: TFeeds;
    editFeed: (feed: IFeed) => void;
    folderId: TFolderID;
}

const ListFeeds = (props: IListFeedsProps) => {
    const { editFeed, feeds, folderId } = props;

    const feedList = feeds
        .filter((feed: IFeed) => {
            return feed.folder_id === folderId;
        })
        .toArray()
        .map((feed: IFeed) => {
            return <FeedItem key={feed._id} feed={feed} editFeed={editFeed} />;
        });

    return (
        <div>
            {feedList}
            <div className="clear" />
        </div>
    );
};

export default ListFeeds;
