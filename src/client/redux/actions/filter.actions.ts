import { OrderedMap } from "immutable";

import * as ACT_TYPES from "../actiontypes";
import * as FilterServices from "../services/filter.services";
import * as Types from "../../types";

export function filterVisibleEntries() {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const {
            entriesStore,
            feedsStore,
            filterStore,
            foldersStore
        } = getState();
        const entries = entriesStore.entries;
        const feeds = feedsStore.feeds;
        const filter = filterStore.filter;
        const folders = foldersStore.folders;

        const title = FilterServices.getFilterTitle(filter, feeds, folders);
        const filteredEntries = FilterServices.getFilteredEntries(
            filter,
            entries,
            feeds
        );

        dispatch(setNewFilter(title, filteredEntries));
    };
}

export function filterChange(newFilter: Types.IFilter) {
    return {
        type: ACT_TYPES.FILTER_CHANGE,
        newFilter
    };
}

function setNewFilter(
    filterTitle: string,
    filteredEntries: OrderedMap<Types.TEntryID, Types.IEntry>
) {
    return {
        type: ACT_TYPES.FILTER_SET_DATA,
        filterTitle,
        filteredEntries
    };
}

export function filterReset() {
    return {
        type: ACT_TYPES.FILTER_RESET
    };
}
