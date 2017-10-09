
import { Set } from "immutable";

import {
    ENTRIES_GET_COMPLETE
} from "../actiontypes";

const INITIAL_STATE = {
    entries: Set()
};

function entriesReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case ENTRIES_GET_COMPLETE: {

            const entries = Set(action.entries);

            return {
                ...state,
                entries
            }
        }

        default:
            return {...state};
    }
}

export default entriesReducer;