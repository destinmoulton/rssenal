
import { List } from "immutable";

import {
    ENTRIES_GET_COMPLETE
} from "../actiontypes";

const INITIAL_STATE = {
    entries: List()
};

function entriesReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case ENTRIES_GET_COMPLETE: {

            const entries = List(action.entries);

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