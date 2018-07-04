import {
    MESSAGES_ADD_COMPLETE,
    MESSAGES_REMOVE_COMPLETE
} from "../actiontypes";
import * as MessagesServices from "../services/messages.services";
import * as Types from "../../types";

export function message(messageText: string, level: any) {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { lastUID, messages } = getState().messagesStore;
        const nextUID = MessagesServices.getNextUID(lastUID);
        const newMessages = MessagesServices.addMessage(
            { messageText, level },
            nextUID,
            messages
        );
        dispatch(messageAddComplete(newMessages, nextUID));
    };
}

function messageAddComplete(messages: Types.TMessages, lastUID: number) {
    return {
        type: MESSAGES_ADD_COMPLETE,
        messages,
        lastUID
    };
}

export function messageRemove(messageToRemove: Types.IMessage) {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { messages } = getState().messagesStore;

        const newMessages = MessagesServices.removeMessage(
            messageToRemove,
            messages
        );
        dispatch(messageRemoveComplete(newMessages));
    };
}

function messageRemoveComplete(messages: Types.TMessages) {
    return {
        type: MESSAGES_REMOVE_COMPLETE,
        messages
    };
}
