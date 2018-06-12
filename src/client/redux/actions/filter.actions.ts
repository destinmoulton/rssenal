import { OrderedMap } from "immutable";
import { FILTER_CHANGE, FILTER_RESET } from "../actiontypes";

import * as Types from "../../interfaces";

export function changeFilter(filter: Types.IFilter) {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { entriesStore } = getState();
        dispatch(filterVisibleEntries(filter, entriesStore.entries));
    };
}

export function filterVisibleEntries(
    filter: Types.IFilter,
    allEntries: Types.TEntries
) {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { feedsStore, foldersStore } = getState();
        const allFeeds = feedsStore.feeds;

        let title = "All";

        let filteredEntries = allEntries.toOrderedMap();
        switch (filter.limit) {
            case "feed":
                const activeFeed = feedsStore.feeds.get(filter.id);
                title = activeFeed.title;

                filteredEntries = allEntries
                    .filter(entry => {
                        return entry.feed_id === filter.id;
                    })
                    .toOrderedMap();
                break;
            case "folder":
                if (filter.id !== "all") {
                    const activeFolder = foldersStore.folders.get(filter.id);

                    title = activeFolder.name;

                    const feedIds = allFeeds
                        .filter(feed => {
                            return feed.folder_id === filter.id;
                        })
                        .map(feed => {
                            return feed._id;
                        });

                    filteredEntries = allEntries
                        .filter(entry => {
                            return feedIds.includes(entry.feed_id);
                        })
                        .toOrderedMap();
                }
                break;
        }
        console.log(filteredEntries);
        dispatch(setNewFilter(filter, title, filteredEntries));
    };
}

function setNewFilter(
    newFilter: Types.IFilter,
    filterTitle: string,
    filteredEntries: OrderedMap<Types.TEntryID, Types.IEntry>
) {
    return {
        type: FILTER_CHANGE,
        newFilter,
        filterTitle,
        filteredEntries
    };
}

export function resetFilter() {
    return {
        type: FILTER_RESET
    };
}
