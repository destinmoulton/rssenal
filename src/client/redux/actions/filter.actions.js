
import {
    FILTER_CHANGE
} from "../actiontypes";

export function changeFilter(newFilter){
    return {
        type: FILTER_CHANGE,
        newFilter
    }
}