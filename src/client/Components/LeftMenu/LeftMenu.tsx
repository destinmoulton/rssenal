import { OrderedMap } from "immutable";
import * as React from "react";
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

import { TFeeds, IFeed, IFeedgroup, IDispatch, IRootStoreState, TFeedID, TFeedgroupID } from "../../interfaces";

interface IMapStateProps {
    feeds: TFeeds;
    hasFeedGroups: boolean;
    groups: OrderedMap<TFeedgroupID, IFeedgroup>;
}

interface IMapDispatchProps {
    beginGetEntries: ()=>void;
    getAllFeedGroups: ()=>void;
    getAllFeeds: ()=>void;
}

interface ILeftMenuProps extends IMapStateProps, IMapDispatchProps{

}

interface ILeftMenuState {
    addFeedModalOpen: boolean;
    editFeed: IFeed;
    editFeedModalOpen: boolean;
    editGroup: IFeedgroup;
    editGroupModalOpen: boolean;
}
class LeftMenu extends React.Component<ILeftMenuProps> {
    state: ILeftMenuState = {
        addFeedModalOpen: false,
        editFeed: null,
        editFeedModalOpen: false,
        editGroup: null,
        editGroupModalOpen: false
    };

    constructor(props: ILeftMenuProps){
        super(props);
        
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

    _handleOpenAddFeedModal(feed: IFeed){
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

    _handleOpenEditGroupModal(group: IFeedgroup){
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

    _handleOpenEditFeedModal(feed: IFeed){
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

    render(){
        const {
            addFeedModalOpen,
            editFeed,
            editFeedModalOpen,
            editGroup,
            editGroupModalOpen,
        } = this.state;

        const { groups } = this.props;
        const sortedGroups = groups.sort((a: IFeedgroup, b: IFeedgroup)=>compareAscByProp(a, b, "order"));

        let listFeedGroups = sortedGroups.toArray().map((group)=>{
            return (
                <div key={group._id} >
                    <GroupItem
                        group={group}
                        editGroup={this._handleOpenEditGroupModal}
                        editFeed={this._handleOpenEditFeedModal}
                    />
                </div>
            );
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

const mapStateToProps = (state: IRootStoreState): IMapStateProps =>{
    const { feedgroups, feeds } = state;

    return {
        feeds: feeds.feeds,
        hasFeedGroups: feedgroups.hasFeedGroups,
        groups: feedgroups.groups
    }
}

const mapDispatchToProps = (dispatch: IDispatch): IMapDispatchProps=>{
    return {
        beginGetEntries: ()=>dispatch(beginGetEntries()),
        getAllFeedGroups: ()=>dispatch(getAllFeedGroups()),
        getAllFeeds: ()=>dispatch(getAllFeeds())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);