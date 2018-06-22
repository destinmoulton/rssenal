import { MESSAGES_ADD, MESSAGES_REMOVE } from "../actiontypes";

import { IMessage, IMessageAction, IReducerStateMessages } from "../../types";

import { MESSAGES_INITIAL_STATE } from "../initialstate";

const messagesReducer = function(
    state = MESSAGES_INITIAL_STATE,
    action: IMessageAction
) {
    switch (action.type) {
        case MESSAGES_ADD:
            const nextUID = state.lastUID + 1;
            const newMessage = (Object as any).assign({}, action.message);
            newMessage.uid = nextUID;
            return {
                ...state,
                messages: state.messages.push(newMessage),
                lastUID: nextUID
            };
        case MESSAGES_REMOVE:
            const index = state.messages.findIndex((message: IMessage) => {
                return message.uid === action.message.uid;
            });

            return {
                ...state,
                messages: state.messages.remove(index)
            };
        default:
            return state;
    }
};

export default messagesReducer;
