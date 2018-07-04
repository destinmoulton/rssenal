import * as Types from "../../types";

interface IMessageInfo {
    messageText: string;
    level: any;
}
export function addMessage(
    messageInfo: IMessageInfo,
    nextUID: number,
    messages: Types.TMessages
) {
    const message: Types.IMessage = {
        message: messageInfo.messageText,
        level: messageInfo.level,
        uid: nextUID
    };

    return messages.push(message);
}

export function getNextUID(lastUID: number) {
    return lastUID + 1;
}

export function removeMessage(
    messageToRemove: Types.IMessage,
    messages: Types.TMessages
) {
    const index = messages.findIndex((message: Types.IMessage) => {
        return message.uid === messageToRemove.uid;
    });

    return messages.remove(index);
}
