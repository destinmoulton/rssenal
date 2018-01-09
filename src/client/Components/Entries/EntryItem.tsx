import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";

import { Icon } from "semantic-ui-react";

interface ISanitizeHTML {
    (html: string, options: any): string;
}
const sanitizeHTML: ISanitizeHTML = require("sanitize-html-react");

import {
    TEntryID,
    IEntry,
    TFeeds,
    IRootStoreState,
    ISetting
} from "../../interfaces";

interface IEntryItemProps {
    entry: IEntry;
    feeds: TFeeds;
    toggleEntry: (entryId: TEntryID) => void;
    isActive: boolean;
    settings: ISetting[];
}

class EntryItem extends React.Component<IEntryItemProps> {
    state = {
        shouldShowImages: false
    };

    componentWillReceiveProps({ settings }: IEntryItemProps) {
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

    _getBodyHTML() {
        const { entry } = this.props;
        const { shouldShowImages } = this.state;

        let allowedTags = [
            "a",
            "b",
            "br",
            "em",
            "figure",
            "figcaption",
            "p",
            "span",
            "strong"
        ];
        if (shouldShowImages) {
            allowedTags.push("img");
        }

        let allowedAttributes: {
            a: ["href", "target"];
            img: ["src", "class"];
            span: [""];
            p: [""];
        };

        let transformTags = {
            div: (tagName: string, attribs: any) => {
                return {
                    tagName: "p",
                    attribs: {}
                };
            },
            a: (tagName: string, attribs: any) => {
                if (attribs.href) {
                    return {
                        tagName,
                        attribs: {
                            href: attribs.href,
                            target: "_blank"
                        }
                    };
                } else {
                    return {
                        tagName: "span"
                    };
                }
            },
            img: (tagName: string, attribs: any) => {
                return {
                    tagName,
                    attribs: {
                        src: attribs.src,
                        //width: "100%",
                        class: "rss-entry-content-body-img"
                    }
                };
            }
        };

        return {
            __html: sanitizeHTML(entry.content, {
                allowedTags,
                allowedAttributes,
                transformTags
            })
        };
    }

    _getTitle() {
        let allowedTags: string[] = [];
        let allowedAttributes: string[] = [];
        return sanitizeHTML(this.props.entry.title, {
            allowedTags,
            allowedAttributes
        });
    }

    _getActiveEntryContent() {
        const { entry, feeds } = this.props;

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

        const body = (
            <div
                dangerouslySetInnerHTML={this._getBodyHTML()}
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
            console.log(entry.content);
            content = this._getActiveEntryContent();
        }

        const title = this._getTitle();

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

export default connect(mapStateToProps)(EntryItem);
