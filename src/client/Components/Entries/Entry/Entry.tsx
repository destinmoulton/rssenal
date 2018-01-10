import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";

import { Icon } from "semantic-ui-react";

import {
    sanitizeEntryContent,
    sanitizeEntryTitle
} from "../../../lib/sanitizer";

import {
    TEntryID,
    IEntry,
    TFeeds,
    IRootStoreState,
    ISetting
} from "../../../interfaces";

interface IEntryProps {
    entry: IEntry;
    feeds: TFeeds;
    toggleEntry: (entryId: TEntryID) => void;
    isActive: boolean;
    settings: ISetting[];
}

class Entry extends React.Component<IEntryProps> {
    state = {
        shouldShowImages: false
    };

    componentWillReceiveProps({ settings }: IEntryProps) {
        let shouldShowImages = false;
        settings.forEach(setting => {
            if (setting.key === "show_images") {
                shouldShowImages = setting.value;
            }
        });

        this.setState({
            shouldShowImages
        });
    }

    _toggleEntry(entryId: TEntryID) {
        const { toggleEntry } = this.props;

        toggleEntry(entryId);
    }

    _getActiveEntryContent() {
        const { entry, feeds } = this.props;
        const { shouldShowImages } = this.state;

        const activeFeed = feeds.get(entry.feed_id);
        const creator =
            entry.creator !== undefined || entry.creator !== ""
                ? " by " + entry.creator
                : "";
        const timeAgo = moment(entry.publish_date).fromNow();

        const info = (
            <div className="rss-entry-info-container">
                {activeFeed.title}
                {creator} -- {timeAgo}
            </div>
        );

        const sanitizedHTML = {
            __html: sanitizeEntryContent(entry.content, shouldShowImages)
        };
        const body = (
            <div
                dangerouslySetInnerHTML={sanitizedHTML}
                className="rss-entry-content-container"
            />
        );

        const link = (
            <div className="rss-entry-link-container">
                <a target="_blank" href={entry.link}>
                    <Icon name="external square" /> Visit Website
                </a>
            </div>
        );

        return (
            <div>
                {info}
                {body}
                {link}
            </div>
        );
    }

    render() {
        const { entry, isActive } = this.props;

        let content = null;
        if (isActive) {
            content = this._getActiveEntryContent();
        }

        const title = sanitizeEntryTitle(entry.title);

        const entryClass = entry.has_read
            ? "rss-entry-title-hasread"
            : "rss-entry-title-unread";
        return (
            <div
                className="rss-entry-container"
                id={`rss-entry-item-${entry._id}`}
            >
                <div
                    className={entryClass}
                    onClick={this._toggleEntry.bind(this, entry._id)}
                >
                    {title}
                </div>
                {content}
            </div>
        );
    }
}

const mapStateToProps = (state: IRootStoreState) => {
    const { feeds, settings } = state;
    return {
        feeds: feeds.feeds,
        settings: settings.settings
    };
};

export default connect(mapStateToProps)(Entry);
