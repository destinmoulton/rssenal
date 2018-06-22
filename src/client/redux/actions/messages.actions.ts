import { Notification } from "react-notification-system";

import {
    MESSAGES_ADD_COMPLETE,
    MESSAGES_REMOVE_COMPLETE
} from "../actiontypes";
import * as Types from "../../types";

export function message(messageText: string, level: any) {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { lastUID, messages } = getState().messagesStore;

        const nextUID: number = lastUID + 1;

        const message: Types.IMessage = {
            message: messageText,
            level,
            uid: nextUID
        };

        const newMessages = messages.push(message);
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

        const index = messages.findIndex((message: Types.IMessage) => {
            return message.uid === messageToRemove.uid;
        });

        const newMessages = messages.remove(index);
        dispatch(messageRemoveComplete(newMessages));
    };
}

function messageRemoveComplete(messages: Types.TMessages) {
    return {
        type: MESSAGES_REMOVE_COMPLETE,
        messages
    };
}
