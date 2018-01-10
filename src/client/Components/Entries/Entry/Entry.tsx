import * as React from "react";
import { connect } from "react-redux";

import { Icon } from "semantic-ui-react";

import Content from "./Content";
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

    render() {
        const { entry, feeds, isActive } = this.props;
        const { shouldShowImages } = this.state;

        let content = null;
        if (isActive) {
            const activeFeedTitle = feeds.get(entry.feed_id).title;
            content = (
                <Content
                    entry={entry}
                    activeFeedTitle={activeFeedTitle}
                    shouldShowImages={shouldShowImages}
                />
            );
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
