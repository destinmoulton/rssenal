import { List } from "immutable";


const INITIAL_STATE = {
    groups: List()
};

const FeedGroupsReducer = function(state = INITIAL_STATE, action){
    switch(action.type){
        default:
            return state;
    }
}

export default FeedGroupsReducer;