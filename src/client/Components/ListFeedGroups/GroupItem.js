import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Button, Confirm, Icon } from "semantic-ui-react";

import { beginDeleteFeedGroup, beginSaveFeedGroup } from "../../redux/actions/feedgroups.actions";
import { changeFilter } from "../../redux/actions/filter.actions";

class GroupItem extends Component {
    static propTypes = {
        group: PropTypes.object.isRequired
    };

    constructor(props){
        super(props);

        this.state = {
            optionsAreVisible: false,
            isEditing: false,
            isThisGroupSaving: false,
            editGroupName: props.group.name
        }

        this._showOptions = this._showOptions.bind(this);
        this._hideOptions = this._hideOptions.bind(this);
        this._handleClickDelete = this._handleClickDelete.bind(this);
        this._handleClickEdit = this._handleClickEdit.bind(this);
        this._handleClickEditCancel = this._handleClickEditCancel.bind(this);
        this._handleClickGroupTitle = this._handleClickGroupTitle.bind(this);
        this._handleEditSave = this._handleEditSave.bind(this);
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleInputOnChange = this._handleInputOnChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
        const { isEditing, isThisGroupSaving } = this.state;

        const nextIsThisGroupSaving = nextProps.updatingFeedGroups.findIndex((testGrpId)=>testGrpId===this.props.group._id) > -1 ? true : false;
        if(isEditing && isThisGroupSaving && !nextIsThisGroupSaving){
            // Editing is complete
            this.setState({
                isEditing: false,
                isThisGroupSaving: false
            })
        } else if(isEditing && !isThisGroupSaving && nextIsThisGroupSaving){
            // This group is saving
            this.setState({
                isThisGroupSaving: true
            })
        }
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
        this.setState({
            isEditing: true,
            optionsAreVisible: false,
            editGroupName: this.props.group.name
        })

    }

    _handleClickEditCancel(){
        this.setState({
            isEditing: false,
            optionsAreVisible: false
        })
    }

    _handleEditSave(){
        const { group } = this.props;
        const { editGroupName } = this.state;
        this.props.beginSaveFeedGroup(group._id, editGroupName);
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

    _handleInputKeyPress(e){
        if(e.key === "Enter"){
            this._handleEditSave();
        }
    }

    _handleInputOnChange(e){
        this.setState({
            editGroupName: e.target.value
        });
    }

    _buildEditInput(){
        const { editGroupName, isThisGroupSaving } = this.state;

        return (
            <input
                autoFocus
                value={editGroupName}
                onKeyPress={this._handleInputKeyPress}
                onChange={this._handleInputOnChange}
                disabled={isThisGroupSaving}
            />
        )
    }

    _buildEditButtons(){
        const { isThisGroupSaving } = this.state;

        let cancelButton = "";
        if(!isThisGroupSaving){
            cancelButton = <Button 
                                size="mini"
                                color="orange"
                                inverted
                                onClick={this._handleClickEditCancel}><Icon name="cancel"/>&nbsp;Cancel</Button>;
        }

        return (
            <span>
                <Button 
                    size="mini"
                    color="green"
                    inverted
                    onClick={this._handleEditSave}
                    loading={isThisGroupSaving}><Icon name="save"/>&nbsp;Save</Button>
                {cancelButton}
            </span>
        );
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
        const { group, updatingFeedGroups } = this.props;
        const { 
            isEditing, 
            optionsAreVisible
        } = this.state;

        let title = "";
        let options = "";
        if(isEditing){
            title = this._buildEditInput();
            options = this._buildEditButtons();
        } else {
            title = this._buildGroupTitle();

            if(optionsAreVisible){
                options = this._buildOptionButtons();
            }
        }

        return (
            <div
                className="rss-feedgroups-groupitem"
                onMouseEnter={this._showOptions}
                onMouseLeave={this._hideOptions}>
                {title}&nbsp;{options}
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
        beginSaveFeedGroup: (groupId, newGroupName)=> dispatch(beginSaveFeedGroup(groupId, newGroupName)),
        beginDeleteFeedGroup: (groupId)=> dispatch(beginDeleteFeedGroup(groupId)),
        changeFilter: (newFilter)=> dispatch(changeFilter(newFilter))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupItem);