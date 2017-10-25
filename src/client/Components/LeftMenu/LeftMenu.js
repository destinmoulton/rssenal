
import React, {Component} from "react";
import { connect } from "react-redux";

import { beginGetEntries } from "../../redux/actions/entries.actions";
import { getAllFeedGroups } from "../../redux/actions/feedgroups.actions";
import { getAllFeeds } from "../../redux/actions/feeds.actions";

import AddFeedModal from "../Modals/AddFeedModal";
import ButtonBar from "./ButtonBar";
import EditFeedModal from "../Modals/EditFeedModal";
import GroupEditorModal from "../Modals/GroupEditorModal";
import GroupItem from "./GroupItem";

import { compareAscByProp } from "../../lib/sort";

class LeftMenu extends Component {
    constructor(props){
        super(props);

        this.state = {
            addFeedModalOpen: false,
            editFeed: {},
            editFeedModalOpen: false,
            editGroup: {},
            editGroupModalOpen: false
        }
        
        this._handleCloseAddFeedModal = this._handleCloseAddFeedModal.bind(this);
        this._handleCloseEditFeedModal = this._handleCloseEditFeedModal.bind(this);
        this._handleCloseEditGroupModal = this._handleCloseEditGroupModal.bind(this);
        this._handleOpenAddFeedModal = this._handleOpenAddFeedModal.bind(this);
        this._handleOpenEditFeedModal = this._handleOpenEditFeedModal.bind(this);
        this._handleOpenEditGroupModal = this._handleOpenEditGroupModal.bind(this);
        
    }

    componentWillMount(){
        const { 
            beginGetEntries,
            getAllFeedGroups,
            getAllFeeds,
            hasFeedGroups
        } = this.props;

        if(!hasFeedGroups){
            getAllFeedGroups();
            getAllFeeds();
            beginGetEntries();
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

    _handleOpenEditFeedModal(feed){
        this.setState({
            editFeed: feed,
            editFeedModalOpen: true
        });
    }

    _handleCloseEditFeedModal(){
        this.setState({
            editFeed: {},
            editFeedModalOpen: false
        });
    }

    _sortGroups(groups){
        return groups.sort((a, b)=>compareAscByProp(a, b, "order"));
    }    

    render(){
        const {
            addFeedModalOpen,
            editFeed,
            editFeedModalOpen,
            editGroup,
            editGroupModalOpen,
        } = this.state;

        const { groups } = this.props;
        const sortedGroups = this._sortGroups(groups);

        let listFeedGroups = [];
        sortedGroups.map((group)=>{
            const groupBlock = <div key={group._id} >
                                   <GroupItem
                                        group={group}
                                        editGroup={this._handleOpenEditGroupModal}
                                        editFeed={this._handleOpenEditFeedModal}
                                    />
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
                        onCloseModal={this._handleCloseAddFeedModal}
                    />
                    <GroupEditorModal 
                        isModalOpen={editGroupModalOpen}
                        onCloseModal={this._handleCloseEditGroupModal}
                        group={editGroup}
                    />
                    <EditFeedModal
                        isModalOpen={editFeedModalOpen}
                        onCloseModal={this._handleCloseEditFeedModal}
                        feed={editFeed}
                    />
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
        beginGetEntries: ()=>dispatch(beginGetEntries()),
        getAllFeedGroups: ()=>dispatch(getAllFeedGroups()),
        getAllFeeds: ()=>dispatch(getAllFeeds())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);