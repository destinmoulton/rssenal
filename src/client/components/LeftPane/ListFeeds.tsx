import * as React from "react";

import FeedItemContainer from "../../containers/LeftPane/FeedItemContainer";

import { IFeed, TFolderID, TFeeds } from "../../types";

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
            return (
                <FeedItemContainer
                    key={feed._id}
                    feed={feed}
                    editFeed={editFeed}
                />
            );
        });

    return (
        <div>
            {feedList}
            <div className="clear" />
        </div>
    );
};

export default ListFeeds;
