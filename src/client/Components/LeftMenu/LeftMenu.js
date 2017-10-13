
import React, {Component} from "react";
import { connect } from "react-redux";

import { beginUpdateAndGetEntries } from "../../redux/actions/entries.actions";
import { getAllFeedGroups } from "../../redux/actions/feedgroups.actions";
import { getAllFeeds } from "../../redux/actions/feeds.actions";

import AddFeedModal from "../Modals/AddFeedModal";
import ButtonBar from "./ButtonBar";
import GroupEditorModal from "../Modals/GroupEditorModal";
import GroupItem from "./GroupItem";

class LeftMenu extends Component {
    constructor(props){
        super(props);

        this.state = {
            addFeedModalOpen: false,
            editGroup: {},
            editGroupModalOpen: false
        }
        this._handleOpenAddFeedModal = this._handleOpenAddFeedModal.bind(this);
        this._handleCloseAddFeedModal = this._handleCloseAddFeedModal.bind(this);
        this._handleOpenEditGroupModal = this._handleOpenEditGroupModal.bind(this);
        this._handleCloseEditGroupModal = this._handleCloseEditGroupModal.bind(this);
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

    _handleOpenAddFeedModal(feed){
        this.setState({
            editFeed: feed,
            addFeedModalOpen: true
        });
    }

    _handleCloseAddFeedModal(){
        this.setState({
            addFeedModalOpen: false
        });
    }

    _handleOpenEditGroupModal(group){
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

    _sortGroups(groups){
        return groups.sort((a,b)=>this._compareEntries(a, b));
    }

    _compareEntries(a, b){
        if(a.order < b.order){ return -1; }
        if(a.order > b.order){ return 1; }
        if(a.order === b.order){ return 0;}
    }

    render(){
        const {
            addFeedModalOpen,
            editGroup,
            editGroupModalOpen,
        } = this.state;

        const { groups } = this.props;
        const sortedGroups = this._sortGroups(groups);

        let listFeedGroups = [];
        sortedGroups.map((group)=>{
            const groupBlock = <div key={group._id} >
                                   <GroupItem group={group} editGroup={this._handleOpenEditGroupModal}/>
                               </div>;
            listFeedGroups.push(groupBlock);
        })
        
        return(
            <div>
                <div>
                    <ButtonBar 
                        openEditGroupModal={this._handleOpenEditGroupModal}
                        openAddFeedModal={this._handleOpenAddFeedModal}
                    />
                    <AddFeedModal 
                        isModalOpen={addFeedModalOpen}
                        onCloseModal={this._handleCloseAddFeedModal}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);