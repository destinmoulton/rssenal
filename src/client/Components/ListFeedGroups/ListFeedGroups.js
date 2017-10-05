import React, {Component} from "react";

import { connect } from "react-redux";

import { getAllFeedGroups } from "../../redux/actions/feedgroups.actions";
import { getAllFeeds } from "../../redux/actions/feeds.actions";

import GroupItem from "./GroupItem";
import ListFeeds from "./ListFeeds";

class ListFeedGroups extends Component {

    constructor(props){
        super(props);
    }

    componentWillMount(){
        const { getAllFeedGroups, getAllFeeds, hasFeedGroups } = this.props;

        if(!hasFeedGroups){
            getAllFeedGroups();
            getAllFeeds();
        }
    }

    render(){
        const { groups } = this.props;

        let listFeedGroups = [];
        groups.map((group)=>{
            const groupBlock = <div key={group._id} >
                                   <GroupItem group={group} />
                                   <ListFeeds groupId={group._id} />
                               </div>;
            listFeedGroups.push(groupBlock);
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
        getAllFeedGroups: ()=>dispatch(getAllFeedGroups()),
        getAllFeeds: ()=>dispatch(getAllFeeds())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFeedGroups);