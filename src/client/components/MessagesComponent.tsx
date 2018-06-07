import * as React from "react";
import * as NotificationSystem from "react-notification-system";

import { IMessage, TMessages } from "../interfaces";

export interface IMessagesMapDispatch {
    removeMessage?: (message: IMessage) => void;
}

export interface IMessagesMapState {
    messages?: TMessages;
}

type TAllProps = IMessagesMapDispatch & IMessagesMapState;

interface IRefs {
    notificationSystem: NotificationSystem.System;
}

class MessagesComponent extends React.Component<TAllProps> {
    private _refs: IRefs = {
        notificationSystem: null
    };

    componentDidUpdate(prevProps: TAllProps) {
        const newMessages = this.props.messages;
        const oldMessages = prevProps.messages;

        newMessages.map((newMessage: IMessage) => {
            if (!oldMessages.includes(newMessage)) {
                newMessage.onRemove = this._onCloseMessage;
                newMessage.position = "br";
                this._refs.notificationSystem.addNotification(newMessage);
            }
        });
    }

    _onCloseMessage = (message: IMessage) => {
        this.props.removeMessage(message);
    };

    render() {
        return (
            <NotificationSystem
                ref={(ref: NotificationSystem.System) =>
                    (this._refs.notificationSystem = ref)
                }
            />
        );
    }
}

export default MessagesComponent;
