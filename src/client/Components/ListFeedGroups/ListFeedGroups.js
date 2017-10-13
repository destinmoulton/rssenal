
import React, {Component} from "react";
import { connect } from "react-redux";

import { beginUpdateAndGetEntries } from "../../redux/actions/entries.actions";
import { getAllFeedGroups } from "../../redux/actions/feedgroups.actions";
import { getAllFeeds } from "../../redux/actions/feeds.actions";

import AddFeedModal from "../Modals/AddFeedModal";
import ButtonBar from "./ButtonBar";
import GroupEditorModal from "../Modals/GroupEditorModal";
import GroupItem from "./GroupItem";

class ListFeedGroups extends Component {
    constructor(props){
        super(props);

        this.state = {
            editGroup: {},
            editGroupModalOpen: false
        }

        this._handleCloseEditGroupModal = this._handleCloseEditGroupModal.bind(this);
        this._handleEditGroup = this._handleEditGroup.bind(this);
    }

    componentWillMount(){
        const { 
            beginUpdateAndGetEntries,
            getAllFeedGroups,
            getAllFeeds,
            hasFeedGroups
        } = this.props;

        if(!hasFeedGroups){
            getAllFeedGroups();
            getAllFeeds();
            beginUpdateAndGetEntries();
        }
    }

    _handleEditGroup(group){
        this.setState({
            editGroup: group,
            editGroupModalOpen: true
        })
    }

    _handleCloseEditGroupModal(){
        this.setState({
            editGroup: {},
            editGroupModalOpen: false
        });
    }

    render(){
        const { 
            editGroup,
            editGroupModalOpen,
        } = this.state;

        const { groups } = this.props;

        let listFeedGroups = [];
        groups.map((group)=>{
            const groupBlock = <div key={group._id} >
                                   <GroupItem group={group} editGroup={this._handleEditGroup}/>
                               </div>;
            listFeedGroups.push(groupBlock);
        })
        
        return(
            <div>
                <div>
                    <AddFeedModal />
                    <ButtonBar openEditGroupModal={this._handleEditGroup}/>
                    <GroupEditorModal 
                        isModalOpen={editGroupModalOpen}
                        onCloseModal={this._handleCloseEditGroupModal}
                        group={editGroup}/>
                </div>
                <div>
                    {listFeedGroups}
                </div>
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
        beginUpdateAndGetEntries: ()=>dispatch(beginUpdateAndGetEntries()),
        getAllFeedGroups: ()=>dispatch(getAllFeedGroups()),
        getAllFeeds: ()=>dispatch(getAllFeeds())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFeedGroups);