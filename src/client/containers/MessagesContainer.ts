import { connect } from "react-redux";

import { removeMessage } from "../redux/actions/messages.actions";

import MessagesComponent, {
    IMessagesComponentProps
} from "../components/MessagesComponent";

import * as Types from "../interfaces";

const mapStateToProps = (
    state: Types.IRootStoreState
): IMessagesComponentProps => {
    return {
        messages: state.messages.messages
    };
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): IMessagesComponentProps => {
    return {
        removeMessage: (message: Types.IMessage) =>
            dispatch(removeMessage(message))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(MessagesComponent);
