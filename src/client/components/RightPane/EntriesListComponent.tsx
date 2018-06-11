import { OrderedMap } from "immutable";
import * as React from "react";

import Entry from "./Entry/Entry";

import { propertyComparator } from "../../lib/sort";

import {
    IEntry,
    IFilter,
    TEntries,
    TEntryID,
    TFeeds,
    ISetting
} from "../../interfaces";

export interface IEntriesListMapState {
    entries: TEntries;
    feeds: TFeeds;
    filter: IFilter;
    settings: ISetting[];
}

export interface IEntriesListMapDispatch {
    markEntryRead: (entry: IEntry) => void;
}

interface IProps {
    sortBy: string;
}

type TAllProps = IEntriesListMapState & IEntriesListMapDispatch & IProps;

interface IEntriesListState {
    activeEntryId: string;
    currentTitle: string;
    visibleEntries: OrderedMap<TEntryID, IEntry> | Iterable<IEntry>;
}

class EntriesListComponent extends React.Component<
    TAllProps,
    IEntriesListState
> {
    state = {
        activeEntryId: "",
        currentTitle: "",
        visibleEntries: OrderedMap<TEntryID, IEntry>()
    };

    constructor(props: TAllProps) {
        super(props);

        // Setup the global/document level keypress events
        document.onkeydown = this._handleKeyDown.bind(this);
    }

    componentDidMount() {
        this._prepareVisibleEntries(false);
    }

    componentDidUpdate(prevProps: TAllProps) {
        if (this.props.filter.id !== prevProps.filter.id) {
            this._prepareVisibleEntries(true);

            // Reset scroll to top
            document.querySelector(".rss-entrylist-container").scrollTo(0, 0);

            this.setState({
                activeEntryId: ""
            });
        } else if (this.props.sortBy !== prevProps.sortBy) {
            this._prepareVisibleEntries(false);
        }
    }

    _prepareVisibleEntries(hasFilterChanged: boolean) {
        const filteredEntries = this._filterEntries();

        let visibleEntries = this._sortEntries(filteredEntries);

        if (hasFilterChanged) {
            visibleEntries = this._filterHiddenEntries(visibleEntries);
        }

        this.setState({
            visibleEntries: OrderedMap(visibleEntries)
        });
    }

    _filterEntries() {
        const { entries, feeds, filter } = this.props;

        switch (filter.limit) {
            case "feed":
                return entries
                    .filter(entry => {
                        return entry.feed_id === filter.id;
                    })
                    .toOrderedMap();
            case "folder":
                if (filter.id !== "all") {
                    const feedIds = feeds
                        .filter(feed => {
                            return feed.folder_id === filter.id;
                        })
                        .map(feed => {
                            return feed._id;
                        });

                    return entries
                        .filter(entry => {
                            return feedIds.includes(entry.feed_id);
                        })
                        .toOrderedMap();
                }
                break;
        }
        return entries.toOrderedMap();
    }

    _sortEntries(entries: TEntries) {
        const sortParams = this.props.sortBy.split(":");
        return entries.sort((a, b) =>
            propertyComparator(a, b, sortParams[1], sortParams[0])
        );
    }

    _filterHiddenEntries(visibleEntries: any) {
        const { settings } = this.props;

        if (false === settings[1].value) {
            return visibleEntries.filter((entry: IEntry) => {
                return false === entry.has_read;
            });
        }
        return visibleEntries;
    }

    _handleKeyDown = (e: any) => {
        switch (e.key) {
            case "ArrowDown":
            case "j":
                //e.preventDefault();
                this._activateSiblingEntry("next");
                break;
            case "ArrowUp":
            case "k":
                //e.preventDefault();
                this._activateSiblingEntry("previous");
                break;
        }
    };

    _handleToggleEntry = (entryId: TEntryID) => {
        let nextActiveEntryId = entryId;
        if (this.state.activeEntryId === entryId) {
            nextActiveEntryId = "";
        }

        if (nextActiveEntryId !== "") {
            this._markRead(nextActiveEntryId);
        }

        this.setState({
            activeEntryId: nextActiveEntryId
        });
    };

    _activateSiblingEntry(direction: string) {
        const { activeEntryId, visibleEntries } = this.state;

        let sibling: IEntry = null;

        if (activeEntryId === "") {
            sibling = visibleEntries.first();
        } else {
            let previousEntry: IEntry = null;
            let nextEntry: IEntry = null;
            let found = false;
            visibleEntries.map(entry => {
                if (found && !nextEntry) {
                    nextEntry = entry;
                }

                if (entry._id === activeEntryId) {
                    found = true;
                }

                if (!found) {
                    previousEntry = entry;
                }
            });

            if (direction === "next") {
                if (nextEntry !== null) {
                    sibling = nextEntry;
                } else {
                    sibling = visibleEntries.last();
                }
            } else if (direction === "previous") {
                if (previousEntry !== null) {
                    sibling = previousEntry;
                } else {
                    sibling = visibleEntries.first();
                }
            }
        }

        this._markRead(sibling._id);

        this._scrollToEntry(sibling._id);

        this.setState({
            activeEntryId: sibling._id
        });
    }

    _scrollToEntry(entryId: TEntryID) {
        const entryEl = document.getElementById("rss-entry-item-" + entryId);
        setTimeout(() => {
            document
                .querySelector(".rss-entrylist-container")
                .scrollTo(0, entryEl.offsetTop);
        }, 10);
    }

    _markRead(entryId: TEntryID) {
        const { entries, markEntryRead } = this.props;
        const entryToMark = entries.get(entryId);

        if (!entryToMark.has_read) {
            markEntryRead(entryToMark);
        }
    }

    _generateEntries() {
        const { activeEntryId, visibleEntries } = this.state;
        const { settings } = this.props;

        let shouldShowImages = false;
        settings.forEach(setting => {
            if (setting.key === "show_images") {
                shouldShowImages = setting.value;
            }
        });

        return visibleEntries.toArray().map(entry => {
            const isActive = entry._id === activeEntryId;
            return (
                <Entry
                    key={entry._id}
                    entry={entry}
                    toggleEntry={this._handleToggleEntry}
                    isActive={isActive}
                    shouldShowImages={shouldShowImages}
                />
            );
        });
    }

    render() {
        const entryList = this._generateEntries();

        return (
            <div>
                <div className="rss-entrylist-container">{entryList}</div>
            </div>
        );
    }
}

export default EntriesListComponent;
