import React, {Component} from "react";

import { connect } from "react-redux";

import { getAllFeedGroups } from "../redux/actions/feedgroups.actions";

import GroupItem from "./ListFeedGroups/GroupItem";

class ListFeedGroups extends Component {

    constructor(props){
        super(props);
    }

    componentWillMount(){
        const { getAllFeedGroups, hasFeedGroups } = this.props;

        if(!hasFeedGroups){
            getAllFeedGroups();
        }
    }

    render(){
        const { groups } = this.props;

        let listFeedGroups = [];
        groups.map((group)=>{
            
            listFeedGroups.push(<GroupItem key={group._id} group={group} />);
        })
        
        return(
            <div>
                {listFeedGroups}
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    const { feedgroups } = state;

    return {
        hasFeedGroups: feedgroups.hasFeedGroups,
        groups: feedgroups.groups
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        getAllFeedGroups: ()=>dispatch(getAllFeedGroups())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFeedGroups);