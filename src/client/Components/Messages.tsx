import * as React from "react";
import { connect } from "react-redux";

import { IDispatch, IRootStoreState, TMessages } from "../interfaces";

interface IMapStateToProps {
    messages: TMessages
}

interface IMapDispatchToProps {

}

interface IMessagesProps extends IMapStateToProps, IMapDispatchToProps {

}

class Messages extends React.Component<IMessagesProps> {
    render(){
        return (
            <div>
                
            </div>
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

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Messages);