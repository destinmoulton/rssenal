import debug from "debug";
import * as React from "react";

import Content from "./Content";
import { sanitizeEntryTitle } from "../../../lib/sanitizer";

import { TEntryID, IEntry } from "../../../types";
const log = debug("rssenal:Entry");

interface IEntryProps {
    entry: IEntry;
    toggleEntry: (entryId: TEntryID) => void;
    isActive: boolean;
    shouldShowImages: boolean;
}

class Entry extends React.Component<IEntryProps> {
    _toggleEntry(entryId: TEntryID) {
        log("_toggleEntry()");
        const { toggleEntry } = this.props;

        toggleEntry(entryId);
    }

    render() {
        const { entry, isActive, shouldShowImages } = this.props;
        log("render()");

        let content = null;
        if (isActive) {
            content = (
                <Content entry={entry} shouldShowImages={shouldShowImages} />
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

export default Entry;
