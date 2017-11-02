import { OrderedMap } from "immutable";
import * as React from "react";
import { connect } from "react-redux";

import { beginGetEntries } from "../../redux/actions/entries.actions";
import { getAllFolders } from "../../redux/actions/folders.actions";
import { getAllFeeds } from "../../redux/actions/feeds.actions";

import AddFeedModal from "../Modals/AddFeedModal";
import ButtonBar from "./ButtonBar";
import EditFeedModal from "../Modals/EditFeedModal";
import FolderEditorModal from "../Modals/FolderEditorModal";
import GroupItem from "./GroupItem";

import { compareAscByProp } from "../../lib/sort";

import { TFeeds, IFeed, IFolder, IDispatch, IRootStoreState, TFeedID, TFolderID } from "../../interfaces";

interface IMapStateProps {
    feeds: TFeeds;
    hasFolders: boolean;
    folders: OrderedMap<TFolderID, IFolder>;
}

interface IMapDispatchProps {
    beginGetEntries: ()=>void;
    getAllFolders: ()=>void;
    getAllFeeds: ()=>void;
}

interface ILeftMenuProps extends IMapStateProps, IMapDispatchProps{

}

interface ILeftMenuState {
    addFeedModalOpen: boolean;
    editFeed: IFeed;
    editFeedModalOpen: boolean;
    editGroup: IFolder;
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
            getAllFolders,
            getAllFeeds,
            hasFolders
        } = this.props;

        if(!hasFolders){
            getAllFolders();
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

    _handleOpenEditGroupModal(folder: IFolder){
        this.setState({
            editGroup: folder,
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

        const { folders } = this.props;
        const sortedGroups = folders.sort((a: IFolder, b: IFolder)=>compareAscByProp(a, b, "order"));

        let listFolders = sortedGroups.toArray().map((folder)=>{
            return (
                <div key={folder._id} >
                    <GroupItem
                        folder={folder}
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
                    <FolderEditorModal 
                        isModalOpen={editGroupModalOpen}
                        onCloseModal={this._handleCloseEditGroupModal}
                        folder={editGroup}
                    />
                    <EditFeedModal
                        isModalOpen={editFeedModalOpen}
                        onCloseModal={this._handleCloseEditFeedModal}
                        feed={editFeed}
                    />
                </div>
                <div>
                    {listFolders}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IRootStoreState): IMapStateProps =>{
    const { folders, feeds } = state;

    return {
        feeds: feeds.feeds,
        hasFolders: folders.hasFolders,
        folders: folders.folders
    }
}

const mapDispatchToProps = (dispatch: IDispatch): IMapDispatchProps=>{
    return {
        beginGetEntries: ()=>dispatch(beginGetEntries()),
        getAllFolders: ()=>dispatch(getAllFolders()),
        getAllFeeds: ()=>dispatch(getAllFeeds())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);