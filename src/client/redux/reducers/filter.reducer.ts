
import {
    FILTER_CHANGE
} from "../actiontypes"

const INITIAL_STATE = {
    filter: {limit: "all"}
};

function filterReducer(state = INITIAL_STATE, action){
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