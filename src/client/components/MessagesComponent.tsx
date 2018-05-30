import { is } from "immutable";
import * as React from "react";
import * as NotificationSystem from "react-notification-system";

import {
    IDispatch,
    IMessage,
    IReducerStateMessages,
    IRootStoreState,
    TMessages
} from "../interfaces";

export interface IMessagesComponentProps {
    messages?: TMessages;
    removeMessage?: (message: IMessage) => void;
}

interface IRefs {
    notificationSystem: NotificationSystem.System;
}

class MessagesComponent extends React.Component<IMessagesComponentProps> {
    private _refs: IRefs = {
        notificationSystem: null
    };

    constructor(props: IMessagesComponentProps) {
        super(props);

        this._onCloseMessage = this._onCloseMessage.bind(this);
    }

    componentWillReceiveProps(nextProps: IMessagesComponentProps) {
        const newMessages = nextProps.messages;
        const oldMessages = this.props.messages;

        newMessages.map((newMessage: IMessage) => {
            if (!oldMessages.includes(newMessage)) {
                newMessage.onRemove = this._onCloseMessage;
                newMessage.position = "br";
                this._refs.notificationSystem.addNotification(newMessage);
            }
        });
    }

    _onCloseMessage(message: IMessage) {
        this.props.removeMessage(message);
    }

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
