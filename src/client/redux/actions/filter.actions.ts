import { FILTER_CHANGE, FILTER_RESET } from "../actiontypes";

import { IDispatch, IFilter } from "../../interfaces";

export function changeFilter(newFilter: IFilter) {
    return (dispatch: IDispatch) => {
        dispatch(setNewFilter(newFilter));
    };
}

function setNewFilter(newFilter: IFilter) {
    return {
        type: FILTER_CHANGE,
        newFilter
    };
}

export function resetFilter() {
    return {
        type: FILTER_RESET
    };
}
