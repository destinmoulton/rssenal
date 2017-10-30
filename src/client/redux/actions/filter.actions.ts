
import {
    FILTER_CHANGE
} from "../actiontypes";

import { IFilter } from "../../interfaces";

export function changeFilter(newFilter: IFilter){
    return {
        type: FILTER_CHANGE,
        newFilter
    }
}