import { connect } from "react-redux";

import { messageRemove } from "../redux/actions/messages.actions";

import MessagesComponent, {
    IMessagesMapDispatch,
    IMessagesMapState
} from "../components/MessagesComponent";

import * as Types from "../types";

const mapStateToProps = (state: Types.IRootStoreState): IMessagesMapState => {
    return {
        messages: state.messagesStore.messages
    };
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): IMessagesMapDispatch => {
    return {
        messageRemove: (message: Types.IMessage) =>
            dispatch(messageRemove(message))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessagesComponent);
