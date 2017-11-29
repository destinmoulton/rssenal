import { is } from "immutable";
import * as React from "react";
import * as NotificationSystem from "react-notification-system";
import { connect } from "react-redux";

import { removeMessage } from "../redux/actions/messages.actions";

import { IDispatch, IMessage, IReducerStateMessages, IRootStoreState, TMessages } from "../interfaces";

interface IMapStateToProps {
    messages: TMessages
}

interface IMapDispatchToProps {
    removeMessage: (message: IMessage)=>IReducerStateMessages
}

interface IMessagesProps extends IMapStateToProps, IMapDispatchToProps {

}

interface IRefs {
    notificationSystem: NotificationSystem.System
}

class Messages extends React.Component<IMessagesProps> {
    private _refs: IRefs = {
        notificationSystem: null
    };

    constructor(props: IMessagesProps){
        super(props);

        this._onCloseMessage = this._onCloseMessage.bind(this);
    }

    componentWillReceiveProps(nextProps: IMessagesProps){
        const newMessages = nextProps.messages;
        const oldMessages = this.props.messages;

        newMessages.map((newMessage: IMessage)=>{
            if(!oldMessages.includes(newMessage)){
                newMessage.onRemove = this._onCloseMessage;
                newMessage.position = "br";
                this._refs.notificationSystem.addNotification(newMessage);
            }
        });
    }

    _onCloseMessage(message: IMessage){
        this.props.removeMessage(message);
    }

    render(){
        return (
            <NotificationSystem 
                ref={(ref: NotificationSystem.System)=>this._refs.notificationSystem = ref}
            />
        );
    }
}

const mapStateToProps = (state: IRootStoreState): IMapStateToProps =>{
    return {
        messages: state.messages.messages
    }
}

const mapDispatchToProps = (dispatch: IDispatch)=>{
    return {
        removeMessage: (message: IMessage)=>dispatch(removeMessage(message))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Messages);