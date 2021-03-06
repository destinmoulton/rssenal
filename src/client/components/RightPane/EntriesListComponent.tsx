import debug from "debug";
import { OrderedMap } from "immutable";
import * as React from "react";

import Entry from "./Entry/Entry";

import { SETTING_SHOW_IMAGES } from "../../constants";
import { propertyComparator } from "../../lib/sort";

import * as Types from "../../types";

const log = debug("rssenal:EntriesListComponent()");

export interface IEntriesListMapState {
    entries: Types.TEntries;
    feeds: Types.TFeeds;
    filter: Types.IFilter;
    settings: Types.TSettings;
    filteredEntries: Types.TEntries;
}

export interface IEntriesListMapDispatch {
    markEntryRead: (entry: Types.IEntry) => void;
}

interface IProps {
    sortBy: string;
}

type TAllProps = IEntriesListMapState & IEntriesListMapDispatch & IProps;

interface IEntriesListState {
    activeEntryId: string;
    currentTitle: string;
    visibleEntries:
        | OrderedMap<Types.TEntryID, Types.IEntry>
        | Iterable<Types.IEntry>;
}

class EntriesListComponent extends React.Component<
    TAllProps,
    IEntriesListState
> {
    state = {
        activeEntryId: "",
        currentTitle: "",
        visibleEntries: OrderedMap<Types.TEntryID, Types.IEntry>()
    };

    constructor(props: TAllProps) {
        super(props);

        // Setup the global/document level keypress events
        document.onkeydown = this._handleKeyDown.bind(this);
    }

    componentDidMount() {
        this._prepareVisibleEntries();
    }

    componentDidUpdate(prevProps: TAllProps) {
        const hasFilterChanged = this.props.filter.id !== prevProps.filter.id;
        const hasSortChanged = this.props.sortBy !== prevProps.sortBy;
        const hasFilteredEntriesChanged = !this.props.filteredEntries.equals(
            prevProps.filteredEntries
        );

        if (hasFilterChanged) {
            this._prepareVisibleEntries();

            // Reset scroll to top
            document.querySelector(".rss-entrylist-container").scrollTo(0, 0);

            this.setState({
                activeEntryId: ""
            });
        } else if (hasFilteredEntriesChanged || hasSortChanged) {
            this._prepareVisibleEntries();
        }
    }

    _prepareVisibleEntries() {
        const { filteredEntries } = this.props;

        let visibleEntries = this._sortEntries(filteredEntries);

        this.setState({
            visibleEntries: OrderedMap(visibleEntries)
        });
    }

    _sortEntries(entries: Types.TEntries) {
        const sortParams = this.props.sortBy.split(":");
        return entries
            .sort((a, b) =>
                propertyComparator(a, b, sortParams[1], sortParams[0], false)
            )
            .toOrderedMap();
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

    _handleToggleEntry = (entryId: Types.TEntryID) => {
        log("_handleToggleEntry()");
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
        log("_activateSiblingEntry()", direction);
        const { activeEntryId, visibleEntries } = this.state;

        let sibling: Types.IEntry = null;

        if (activeEntryId === "") {
            sibling = visibleEntries.first();
        } else {
            let previousEntry: Types.IEntry = null;
            let nextEntry: Types.IEntry = null;
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

    _scrollToEntry(entryId: Types.TEntryID) {
        const entryEl = document.getElementById("rss-entry-item-" + entryId);
        setTimeout(() => {
            document
                .querySelector(".rss-entrylist-container")
                .scrollTo(0, entryEl.offsetTop);
        }, 10);
    }

    _markRead(entryId: Types.TEntryID) {
        log("_markRead()");
        const { entries, markEntryRead } = this.props;
        const entryToMark = entries.get(entryId);

        if (!entryToMark.has_read) {
            markEntryRead(entryToMark);
        }
    }

    _generateEntries() {
        const { activeEntryId, visibleEntries } = this.state;

        const { settings } = this.props;

        const shouldShowImages = settings.get(SETTING_SHOW_IMAGES).value;

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
        log("render()");
        const entryList = this._generateEntries();

        return <div className="rss-entrylist-container">{entryList}</div>;
    }
}

export default EntriesListComponent;
