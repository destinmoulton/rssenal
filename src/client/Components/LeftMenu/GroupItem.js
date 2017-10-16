import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Button, Confirm, Icon } from "semantic-ui-react";

import ListFeeds from "./ListFeeds";

import { beginDeleteFeedGroup, beginSaveFeedGroup } from "../../redux/actions/feedgroups.actions";
import { changeFilter } from "../../redux/actions/filter.actions";

class GroupItem extends Component {
    static propTypes = {
        editGroup: PropTypes.func.isRequired,
        group: PropTypes.object.isRequired
    };

    constructor(props){
        super(props);

        this.state = {
            feedsAreVisible: false,
            optionsAreVisible: false,
            isEditing: false,
            isThisGroupSaving: false,
            editGroupName: props.group.name
        }

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
        const { filter, group } = this.props;

        let className = "";
        if(filter.limit === "group" && filter.id === group._id){
            className = "rss-feedgroups-groupitem-title-active";
        }

        return (
            <span className={className} onClick={this._handleClickGroupTitle}>{group.name}</span>
        );
    }

    render(){
        const {
            group,
            updatingFeedGroups
        } = this.props;

        const {
            feedsAreVisible,
            optionsAreVisible
        } = this.state;

        let toggleFeedsIcon = "";
        let listFeeds = "";
        let title = "";
        let options = "";
        
        let toggleFeedsIconClass = "caret right";
        if(feedsAreVisible){
            toggleFeedsIconClass = "caret down";
            listFeeds = <ListFeeds groupId={group._id} />;
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

const mapStateToProps = (state)=>{
    const { feedgroups, filter } = state;

    return {
        updatingFeedGroups: feedgroups.updatingFeedGroups,
        filter: filter.filter
    };
}

const mapDispatchToProps = (dispatch)=>{
    return {
        beginDeleteFeedGroup: (groupId)=> dispatch(beginDeleteFeedGroup(groupId)),
        changeFilter: (newFilter)=> dispatch(changeFilter(newFilter))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupItem);