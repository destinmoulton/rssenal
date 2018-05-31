import { connect } from "react-redux";

import { removeMessage } from "../redux/actions/messages.actions";

import MessagesComponent, {
    IMessagesMapDispatch,
    IMessagesMapState
} from "../components/MessagesComponent";

import * as Types from "../interfaces";

const mapStateToProps = (state: Types.IRootStoreState): IMessagesMapState => {
    return {
        messages: state.messages.messages
    };
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): IMessagesMapDispatch => {
    return {
        removeMessage: (message: Types.IMessage) =>
            dispatch(removeMessage(message))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(MessagesComponent);
