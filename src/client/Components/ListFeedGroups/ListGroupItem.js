import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Button, Confirm, Icon } from "semantic-ui-react";

import { beginDeleteFeedGroup, beginSaveFeedGroup } from "../../redux/actions/feedgroups.actions";

class ListGroupItem extends Component {
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
        this._handleClickEditSave = this._handleClickEditSave.bind(this);
        this._onChangeGroupNameInput = this._onChangeGroupNameInput.bind(this);
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

    _handleClickEditSave(){
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

    _onChangeGroupNameInput(e){
        this.setState({
            editGroupName: e.target.value
        });
    }

    render(){
        const { group, updatingFeedGroups } = this.props;
        const { editGroupName, isEditing, isThisGroupSaving, optionsAreVisible } = this.state;

        let options = "";
        if(optionsAreVisible && !isEditing){
            options = <span>
                          <Button 
                              size="mini" 
                              icon="pencil"
                              color="green" 
                              inverted
                              onClick={this._handleClickEdit}
                          />
                          <Button 
                              size="mini" 
                              icon="trash" 
                              color="red" 
                              inverted
                              onClick={this._handleClickDelete}
                          />
                      </span>;
        }

        

        let display = group.name;
        if(isEditing){
            display = <input
                          autoFocus
                          value={editGroupName}
                          onChange={this._onChangeGroupNameInput}
                          disabled={isThisGroupSaving}
                      />

            let cancelButton = "";
            if(!isThisGroupSaving){
                cancelButton = <Button 
                                    size="mini"
                                    color="orange"
                                    inverted
                                    onClick={this._handleClickEditCancel}><Icon name="cancel"/>&nbsp;Cancel</Button>;
            }

            options = <span>
                          <Button 
                              size="mini"
                              color="green"
                              inverted
                              onClick={this._handleClickEditSave}
                              loading={isThisGroupSaving}><Icon name="save"/>&nbsp;Save</Button>
                          {cancelButton}
                      </span>;
        }

        return (
            <div
                onMouseEnter={this._showOptions}
                onMouseLeave={this._hideOptions}>
                {display}&nbsp;&nbsp;{options}
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    const { feedgroups } = state;

    return {
        updatingFeedGroups: feedgroups.updatingFeedGroups
    };
}

const mapDispatchToProps = (dispatch)=>{
    return {
        beginSaveFeedGroup: (groupId, newGroupName)=> dispatch(beginSaveFeedGroup(groupId, newGroupName)),
        beginDeleteFeedGroup: (groupId)=> dispatch(beginDeleteFeedGroup(groupId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListGroupItem);