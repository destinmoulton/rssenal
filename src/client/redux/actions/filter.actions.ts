import { OrderedMap } from "immutable";

import { FILTER_CHANGE, FILTER_RESET } from "../actiontypes";
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

export function filterReset() {
    return {
        type: FILTER_RESET
    };
}
