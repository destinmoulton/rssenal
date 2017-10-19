
import { OrderedMap } from "immutable";

import {
    ENTRIES_GET_COMPLETE
} from "../actiontypes";

const INITIAL_STATE = {
    entries: OrderedMap()
};

function entriesReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case ENTRIES_GET_COMPLETE: {
            const arrayMap = action.entries.map((entry)=>{
                return [entry._id, entry];
            });
            const mappedEntries = OrderedMap(arrayMap);

            return {
                ...state,
                entries: mappedEntries
            }
        }

        default:
            return {...state};
    }
}

export default entriesReducer;