import { Map, OrderedMap } from "immutable";
import * as React from "react";
import { connect } from "react-redux";
import { Button, Confirm, Icon } from "semantic-ui-react";

import ListFeeds from "./ListFeeds";

import { beginDeleteFeedGroup, beginSaveFeedGroup } from "../../redux/actions/feedgroups.actions";
import { changeFilter } from "../../redux/actions/filter.actions";

import { IDispatch, IFeed, IFeedgroup, IFilter, IRootStoreState, TFeedgroupID, TFeedID, TFeeds } from "../../interfaces";

interface IMapStateProps {
    filter: IFilter;
    unreadMapGroups: Map<TFeedgroupID, number>;
    feeds: TFeeds;
}

interface IMapDispatchProps {
    beginDeleteFeedGroup: (groupId: TFeedgroupID)=>void;
    changeFilter: (filter: IFilter)=>void;
}

interface IGroupItemProps extends IMapStateProps, IMapDispatchProps{
    editFeed: (feed: IFeed)=>void;
    editGroup: (currentGroup: IFeedgroup)=>void;
    group: IFeedgroup;
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
        editGroupName: this.props.group.name
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
        this.props.editGroup(this.props.group);
    }

    _handleClickDelete(){
        const { beginDeleteFeedGroup, group } = this.props;
        const conf = confirm(`Are you sure you want to delete this (${group.name}) group?`)
        if(conf){
            beginDeleteFeedGroup(group._id);
        }
    }

    _handleClickGroupTitle(){
        const { changeFilter, group } = this.props;

        changeFilter({
            limit: "group",
            id: group._id
        });
    }

    _handleToggleFeedsVisible(){
        this.setState({
            feedsAreVisible: !this.state.feedsAreVisible
        });
    }

    _buildOptionButtons(){
        return (
            <span className="rss-feedgroups-groupitem-options">
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
        const { filter, group, unreadMapGroups } = this.props;

        let className = "";
        if(filter.limit === "group" && filter.id === group._id){
            className = "rss-feedgroups-groupitem-title-active";
        }

        let unread = "";
        if(unreadMapGroups.has(group._id)){
            unread = " [" + unreadMapGroups.get(group._id) + "]";
        }
        return (
            <span className={className} onClick={this._handleClickGroupTitle}>{group.name}{unread}</span>
        );
    }

    render(){
        const {
            editFeed,
            group
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
            listFeeds = <ListFeeds groupId={group._id} editFeed={editFeed}/>;
        }
        toggleFeedsIcon = <Icon name={toggleFeedsIconClass} onClick={this._handleToggleFeedsVisible}/>;

        title = this._buildGroupTitle();

        if(optionsAreVisible){
            options = this._buildOptionButtons();
        }

        return (
            <div>
                <div
                    className="rss-feedgroups-groupitem"
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
        unreadMapGroups: feeds.unreadMap.groups,
        feeds: feeds.feeds
    };
}

const mapDispatchToProps = (dispatch: IDispatch)=>{
    return {
        beginDeleteFeedGroup: (groupId: TFeedgroupID)=> dispatch(beginDeleteFeedGroup(groupId)),
        changeFilter: (newFilter: IFilter)=> dispatch(changeFilter(newFilter))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupItem);