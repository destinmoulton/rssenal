import { MESSAGES_ADD, MESSAGES_REMOVE } from "../actiontypes";
import { IMessage } from "../../types";

export function message(messageText: string, level: string){
    return {
        type: MESSAGES_ADD,
        message: {
            message: messageText,
            level
        }
    }
}

export function removeMessage(message: IMessage){
    return {
        type: MESSAGES_REMOVE,
        message
    }
}