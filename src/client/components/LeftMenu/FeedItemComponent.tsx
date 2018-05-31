import { Map } from "immutable";
import * as React from "react";

import { Icon } from "semantic-ui-react";

import { TFeedID, IFeed, IFeedsUnreadMap, IFilter } from "../../interfaces";

export interface IFeedItemMapState {
    filter: IFilter;
    unreadMapFeeds: Map<TFeedID, number>;
}

export interface IFeedItemMapDispatch {
    beginDeleteFeed: (feedId: TFeedID) => void;
    changeFilter: (newFilter: object) => void;
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

    constructor(props: TAllProps) {
        super(props);

        this._handleClickDelete = this._handleClickDelete.bind(this);
        this._handleClickEdit = this._handleClickEdit.bind(this);
        this._handleClickFeed = this._handleClickFeed.bind(this);
        this._handleHideOptions = this._handleHideOptions.bind(this);
        this._handleShowOptions = this._handleShowOptions.bind(this);
    }

    _handleShowOptions() {
        this.setState({
            isOptionsVisible: true
        });
    }

    _handleHideOptions() {
        this.setState({
            isOptionsVisible: false
        });
    }

    _handleClickDelete() {
        const { beginDeleteFeed, feed } = this.props;
        const conf = confirm(
            `Are you sure you want to delete "${feed.title}"?`
        );
        if (conf) {
            beginDeleteFeed(feed._id);
        }
    }

    _handleClickEdit() {
        this.props.editFeed(this.props.feed);
    }

    _handleClickFeed() {
        const { changeFilter, feed } = this.props;

        changeFilter({
            limit: "feed",
            id: feed._id
        });
    }

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
