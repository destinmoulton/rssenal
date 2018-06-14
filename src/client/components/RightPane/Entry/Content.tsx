import * as React from "react";

import { Icon } from "semantic-ui-react";

import { sanitizeEntryContent } from "../../../lib/sanitizer";

import { IEntry } from "../../../types";

interface IContentProps {
    entry: IEntry;
    shouldShowImages: boolean;
}

const Content = (props: IContentProps) => {
    const { entry, shouldShowImages } = props;

    const creator =
        entry.creator !== undefined || entry.creator !== ""
            ? " by " + entry.creator
            : "";

    const info = (
        <div className="rss-entry-info-container">
            {entry.feedTitle}
            {creator} -- {entry.timeAgo}
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
};

export default Content;
