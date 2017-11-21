
import {
    FILTER_CHANGE
} from "../actiontypes";

import { beginGetEntries } from "./entries.actions";
import { IDispatch, IFilter } from "../../interfaces";

export function changeFilter(newFilter: IFilter){
    return (dispatch: IDispatch)=>{
        dispatch(beginGetEntries);
        dispatch(setNewFilter);
    }
}

function setNewFilter(newFilter: IFilter){
    return {
        type: FILTER_CHANGE,
        newFilter
    }
}