import { Map } from "immutable";
import * as React from "react";

import { Icon } from "semantic-ui-react";

import { TFeedID, IFeed, IFilter, TUnreadMapFeeds } from "../../types";

export interface IFeedItemMapState {
    filter: IFilter;
    unreadMapFeeds: TUnreadMapFeeds;
}

export interface IFeedItemMapDispatch {
    deleteFeed: (feedId: TFeedID) => void;
    filterChange: (newFilter: object) => void;
    filterVisibleEntries: () => void;
}

interface IFeedItemProps {
    editFeed: (feed: IFeed) => void;
    feed: IFeed;
}

type TAllProps = IFeedItemProps & IFeedItemMapState & IFeedItemMapDispatch;

interface IFeedItemState {
    isOptionsVisible: boolean;
}

class FeedItemComponent extends React.Component<TAllProps, IFeedItemState> {
    state = {
        isOptionsVisible: false
    };

    _handleClickDelete = () => {
        const { deleteFeed, feed } = this.props;
        const conf = confirm(
            `Are you sure you want to delete "${feed.title}"?`
        );
        if (conf) {
            deleteFeed(feed._id);
        }
    };

    _handleClickEdit = () => {
        this.props.editFeed(this.props.feed);
    };

    _handleClickFeed = () => {
        const { filterChange, filterVisibleEntries, feed } = this.props;

        filterChange({
            limit: "feed",
            id: feed._id
        });

        filterVisibleEntries();
    };

    _handleHideOptions = () => {
        this.setState({
            isOptionsVisible: false
        });
    };

    _handleShowOptions = () => {
        this.setState({
            isOptionsVisible: true
        });
    };

    _buildOptions() {
        return (
            <div className="rss-folders-feeditem-options">
                <Icon
                    name="pencil"
                    color="green"
                    onClick={this._handleClickEdit}
                />
                <Icon
                    name="trash"
                    color="red"
                    onClick={this._handleClickDelete}
                />
            </div>
        );
    }

    render() {
        const { feed, filter, unreadMapFeeds } = this.props;
        const { isOptionsVisible } = this.state;

        let className = "rss-folders-feeditem";
        if (filter.limit === "feed" && filter.id === feed._id) {
            className = "rss-folders-feeditem rss-folders-feeditem-active";
        }

        let title = (
            <div
                className="rss-folders-feeditem-title"
                onClick={this._handleClickFeed}
            >
                {feed.title}
            </div>
        );

        let unreadEntriesCount = "";
        if (unreadMapFeeds.has(feed._id) && unreadMapFeeds.get(feed._id) > 0) {
            unreadEntriesCount = " [" + unreadMapFeeds.get(feed._id) + "]";
        }
        let unread = (
            <div
                className="rss-folders-feeditem-unread"
                onClick={this._handleClickFeed}
            >
                {unreadEntriesCount}
            </div>
        );

        let options: any = "";
        if (isOptionsVisible) {
            options = this._buildOptions();
        }

        return (
            <div
                className={className}
                onMouseEnter={this._handleShowOptions}
                onMouseLeave={this._handleHideOptions}
            >
                {title}
                {unread}
                {options}
            </div>
        );
    }
}

export default FeedItemComponent;
