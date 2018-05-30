import { OrderedMap } from "immutable";
import * as React from "react";
import { connect } from "react-redux";

import { Button, Loader, Menu } from "semantic-ui-react";

import Entry from "./Entry/Entry";
import SettingsModal from "../Modals/SettingsModal";
import SortMenu from "./SortMenu";

import { propertyComparator } from "../../lib/sort";
import { updateReadState } from "../../redux/actions/entries.actions";

import {
    IDispatch,
    IEntry,
    IFilter,
    IRootStoreState,
    TEntries,
    TEntryID,
    TFolders,
    TFeeds,
    ISetting
} from "../../interfaces";

interface IMapStateProps {
    entries: TEntries;
    folders: TFolders;
    feeds: TFeeds;
    filter: IFilter;
    settings: ISetting[];
}

interface IMapDispatchProps {
    markEntryRead: (entry: IEntry) => void;
}

interface IEntriesListProps extends IMapStateProps, IMapDispatchProps {}

class EntriesList extends React.Component<IEntriesListProps> {
    state = {
        sortBy: "publish_date:asc",
        activeEntryId: "",
        currentTitle: "",
        processedEntries: OrderedMap<TEntryID, IEntry>()
    };

    constructor(props: IEntriesListProps) {
        super(props);

        // Setup the global/document level keypress events
        document.onkeydown = this._handleKeyDown.bind(this);

        this._handleChangeSort = this._handleChangeSort.bind(this);
        this._toggleEntry = this._toggleEntry.bind(this);
    }

    componentWillMount() {
        this._filterAndSortEntries(this.props, this.state.sortBy, false);
    }

    componentWillReceiveProps(nextProps: IEntriesListProps) {
        if (nextProps.filter.id !== this.props.filter.id) {
            this._filterAndSortEntries(nextProps, this.state.sortBy, true);

            // Reset scroll to top
            document.querySelector(".rss-entrylist-container").scrollTo(0, 0);

            this.setState({
                activeEntryId: ""
            });
        } else {
            this._filterAndSortEntries(nextProps, this.state.sortBy, false);
        }
    }

    _filterAndSortEntries(
        props: IEntriesListProps,
        sortBy: string,
        hasFilterChanged: boolean
    ) {
        const { entries, folders, feeds, filter } = props;

        let filteredEntries = entries.toOrderedMap();

        let title = "All";

        switch (filter.limit) {
            case "feed":
                filteredEntries = filteredEntries
                    .filter(entry => {
                        return entry.feed_id === filter.id;
                    })
                    .toOrderedMap();

                const activeFeed = feeds.get(filter.id);

                title = activeFeed.title;
                break;
            case "folder":
                if (filter.id !== "all") {
                    const feedIds = feeds
                        .filter(feed => {
                            return feed.folder_id === filter.id;
                        })
                        .map(feed => {
                            return feed._id;
                        });

                    filteredEntries = entries
                        .filter(entry => {
                            return feedIds.includes(entry.feed_id);
                        })
                        .toOrderedMap();

                    const activeFolder = folders.get(filter.id);

                    title = activeFolder.name;
                }
                break;
        }

        let processedEntries = this._sortEntries(filteredEntries, sortBy);

        if (hasFilterChanged) {
            processedEntries = this._filterHiddenEntries(
                props,
                processedEntries
            );
        }

        this.setState({
            currentTitle: title,
            processedEntries
        });
    }

    _sortEntries(entries: TEntries, sortBy: string) {
        const sortParams = sortBy.split(":");
        return entries.sort((a, b) =>
            propertyComparator(a, b, sortParams[1], sortParams[0])
        );
    }

    _filterHiddenEntries(props: IEntriesListProps, processedEntries: any) {
        const { settings } = props;

        let filteredEntries;

        if (false === settings[1].value) {
            return processedEntries.filter((entry: IEntry) => {
                return false === entry.has_read;
            });
        }
        return processedEntries;
    }

    _handleChangeSort(e: any, data: any) {
        this.setState({
            sortBy: data.value
        });

        this._filterAndSortEntries(this.props, data.value, true);
    }

    _handleKeyDown(e: any) {
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
    }

    _activateSiblingEntry(direction: string) {
        const { activeEntryId, processedEntries } = this.state;

        let sibling: IEntry = null;

        if (activeEntryId === "") {
            sibling = processedEntries.first();
        } else {
            let previousEntry: IEntry = null;
            let nextEntry: IEntry = null;
            let found = false;
            processedEntries.map(entry => {
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
                    sibling = processedEntries.last();
                }
            } else if (direction === "previous") {
                if (previousEntry !== null) {
                    sibling = previousEntry;
                } else {
                    sibling = processedEntries.first();
                }
            }
        }

        this._markRead(sibling._id);

        this._scrollToEntry(sibling._id);

        this.setState({
            activeEntryId: sibling._id
        });
    }

    _toggleEntry(entryId: TEntryID) {
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

    render() {
        const {
            activeEntryId,
            currentTitle,
            processedEntries,
            sortBy
        } = this.state;

        let entryList = processedEntries.toArray().map(entry => {
            const isActive = entry._id === activeEntryId;
            return (
                <Entry
                    key={entry._id}
                    entry={entry}
                    toggleEntry={this._toggleEntry}
                    isActive={isActive}
                />
            );
        });

        return (
            <div>
                <div className="rss-entrylist-menu">
                    <div className="rss-entrylist-menu-title-container">
                        {currentTitle}
                    </div>
                    <div className="rss-entrylist-menu-sortselect-container">
                        <SortMenu
                            onChange={this._handleChangeSort}
                            currentSortBy={sortBy}
                        />&nbsp;&nbsp;
                        <SettingsModal />
                    </div>
                </div>
                <div className="rss-entrylist-container">{entryList}</div>
            </div>
        );
    }
}

const mapStateToProps = (state: IRootStoreState): IMapStateProps => {
    const { entries, feeds, filter, folders, settings } = state;

    return {
        entries: entries.entries,
        feeds: feeds.feeds,
        filter: filter.filter,
        folders: folders.folders,
        settings: settings.settings
    };
};

const mapDispatchToProps = (dispatch: IDispatch): IMapDispatchProps => {
    return {
        markEntryRead: entry => dispatch(updateReadState(entry, true))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EntriesList);