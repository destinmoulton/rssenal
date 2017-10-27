
import {
    FILTER_CHANGE
} from "../actiontypes"

import { IFilterAction } from "../../interfaces";

const INITIAL_STATE = {
    filter: {limit: "all"}
};

function filterReducer(state = INITIAL_STATE, action: IFilterAction){
    switch(action.type){
        case FILTER_CHANGE: {
            return {
                ...state,
                filter: action.newFilter
            }
        }
        default:
            return {
                ...state
            }
    }
}

export default filterReducer;