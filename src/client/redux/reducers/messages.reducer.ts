import {
    MESSAGES_ADD_COMPLETE,
    MESSAGES_REMOVE_COMPLETE
} from "../actiontypes";

import { IMessageAction } from "../../types";

import { MESSAGES_INITIAL_STATE } from "../initialstate";

const messagesReducer = function(
    state = MESSAGES_INITIAL_STATE,
    action: IMessageAction
) {
    switch (action.type) {
        case MESSAGES_ADD_COMPLETE:
            return {
                ...state,
                messages: action.messages,
                lastUID: action.lastUID
            };
        case MESSAGES_REMOVE_COMPLETE:
            return {
                ...state,
                messages: action.messages
            };
        default:
            return state;
    }
};

export default messagesReducer;
