import { List } from "immutable";

import { MESSAGES_ADD } from "../actiontypes";

import { IMessage, IMessageAction,IReducerStateMessages } from "../../interfaces";

const INITIAL_STATE: IReducerStateMessages = {
    messages: List()
}

const messagesReducer = function(state = INITIAL_STATE, action: IMessageAction){
    switch(action.type){
        case MESSAGES_ADD:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default messagesReducer;