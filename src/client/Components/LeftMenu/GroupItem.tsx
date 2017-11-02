import { Map, OrderedMap } from "immutable";
import * as React from "react";
import { connect } from "react-redux";
import { Button, Confirm, Icon } from "semantic-ui-react";

import ListFeeds from "./ListFeeds";

import { beginDeleteFolder, beginSaveFolder } from "../../redux/actions/folders.actions";
import { changeFilter } from "../../redux/actions/filter.actions";

import { IDispatch, IFeed, IFolder, IFilter, IRootStoreState, TFolderID, TFeedID, TFeeds } from "../../interfaces";

interface IMapStateProps {
    filter: IFilter;
    unreadMapGroups: Map<TFolderID, number>;
    feeds: TFeeds;
}

interface IMapDispatchProps {
    beginDeleteFolder: (groupId: TFolderID)=>void;
    changeFilter: (filter: IFilter)=>void;
}

interface IGroupItemProps extends IMapStateProps, IMapDispatchProps{
    editFeed: (feed: IFeed)=>void;
    editGroup: (currentGroup: IFolder)=>void;
    folder: IFolder;
}

interface IGroupItemState {
    feedsAreVisible: boolean;
    optionsAreVisible: boolean;
    isEditing: boolean;
    isThisGroupSaving: boolean;
    editGroupName: string;
}

class GroupItem extends React.Component<IGroupItemProps> {

    state: IGroupItemState = {
        feedsAreVisible: false,
        optionsAreVisible: false,
        isEditing: false,
        isThisGroupSaving: false,
        editGroupName: this.props.folder.name
    }

    constructor(props: IGroupItemProps){
        super(props);

        this._showOptions = this._showOptions.bind(this);
        this._hideOptions = this._hideOptions.bind(this);
        this._handleClickDelete = this._handleClickDelete.bind(this);
        this._handleClickEdit = this._handleClickEdit.bind(this);
        this._handleClickGroupTitle = this._handleClickGroupTitle.bind(this);
        this._handleToggleFeedsVisible = this._handleToggleFeedsVisible.bind(this);
    }

    _showOptions(){
        this.setState({
            optionsAreVisible: true
        })
    }

    _hideOptions(){
        this.setState({
            optionsAreVisible: false
        })
    }

    _handleClickEdit(){
        this.props.editGroup(this.props.folder);
    }

    _handleClickDelete(){
        const { beginDeleteFolder, folder } = this.props;
        const conf = confirm(`Are you sure you want to delete this (${folder.name}) folder?`)
        if(conf){
            beginDeleteFolder(folder._id);
        }
    }

    _handleClickGroupTitle(){
        const { changeFilter, folder } = this.props;

        changeFilter({
            limit: "folder",
            id: folder._id
        });
    }

    _handleToggleFeedsVisible(){
        this.setState({
            feedsAreVisible: !this.state.feedsAreVisible
        });
    }

    _buildOptionButtons(){
        return (
            <span className="rss-folders-groupitem-options">
                <Icon 
                    name="pencil"
                    color="green" 
                    onClick={this._handleClickEdit}
                />
                <Icon
                    name="trash" 
                    color="red" 
                    onClick={this._handleClickDelete}
                />
            </span>
        );
    }

    _buildGroupTitle(){
        const { filter, folder, unreadMapGroups } = this.props;

        let className = "";
        if(filter.limit === "folder" && filter.id === folder._id){
            className = "rss-folders-groupitem-title-active";
        }

        let unread = "";
        if(unreadMapGroups.has(folder._id)){
            unread = " [" + unreadMapGroups.get(folder._id) + "]";
        }
        return (
            <span className={className} onClick={this._handleClickGroupTitle}>{folder.name}{unread}</span>
        );
    }

    render(){
        const {
            editFeed,
            feeds,
            folder
        } = this.props;

        const {
            feedsAreVisible,
            optionsAreVisible
        } = this.state;

        let toggleFeedsIcon = null;
        let listFeeds = null;
        let title = null;
        let options = null;
        
        let toggleFeedsIconClass = "caret right";
        if(feedsAreVisible){
            toggleFeedsIconClass = "caret down";
            listFeeds = <ListFeeds groupId={folder._id} editFeed={editFeed} feeds={feeds}/>;
        }
        toggleFeedsIcon = <Icon name={toggleFeedsIconClass} onClick={this._handleToggleFeedsVisible}/>;

        title = this._buildGroupTitle();

        if(optionsAreVisible){
            options = this._buildOptionButtons();
        }

        return (
            <div>
                <div
                    className="rss-folders-groupitem"
                    onMouseEnter={this._showOptions}
                    onMouseLeave={this._hideOptions}>
                    {toggleFeedsIcon}{title}&nbsp;{options}
                </div>
                {listFeeds}
            </div>
        );
    }
}

const mapStateToProps = (state: IRootStoreState)=>{
    const { feeds, filter } = state;

    return {
        filter: filter.filter,
        unreadMapGroups: feeds.unreadMap.folders,
        feeds: feeds.feeds
    };
}

const mapDispatchToProps = (dispatch: IDispatch)=>{
    return {
        beginDeleteFolder: (groupId: TFolderID)=> dispatch(beginDeleteFolder(groupId)),
        changeFilter: (newFilter: IFilter)=> dispatch(changeFilter(newFilter))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupItem);