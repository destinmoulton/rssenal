import { FILTER_CHANGE, FILTER_RESET } from "../actiontypes";

import * as Types from "../../interfaces";

export function changeFilter(filter: Types.IFilter) {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { feeds, folders } = getState();
        let title = "All";

        switch (filter.limit) {
            case "feed":
                const activeFeed = feeds.feeds.get(filter.id);
                title = activeFeed.title;
                break;
            case "folder":
                if (filter.id !== "all") {
                    const activeFolder = folders.folders.get(filter.id);

                    title = activeFolder.name;
                }
                break;
        }

        dispatch(setNewFilter(filter, title));
    };
}

function setNewFilter(newFilter: Types.IFilter, title: string) {
    return {
        type: FILTER_CHANGE,
        newFilter,
        filterTitle: title
    };
}

export function resetFilter() {
    return {
        type: FILTER_RESET
    };
}
