import React, { Component } from "react";
import { connect } from "react-redux"

import { Button, Icon } from "semantic-ui-react";

import { beginAddFeedGroup } from "../../redux/actions/feedgroups.actions";

const DISPLAY_LINK = "LINK";
const DISPLAY_FORM = "FORM";

class AddGroup extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentDisplay: DISPLAY_LINK,
            groupName: ""
        };

        this._handleClickShowForm = this._handleClickShowForm.bind(this);
        this._handleClickFormCancel = this._handleClickFormCancel.bind(this);
        this._handleChangeGroupName = this._handleChangeGroupName.bind(this);
        this._handleClickSave = this._handleClickSave.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.isAddingFeedGroup && !nextProps.isAddingFeedGroup){
            this.setState({
                currentDisplay: DISPLAY_LINK,
                groupName: ""
            });
        }
    }

    _handleClickShowForm(){
        this.setState({
            currentDisplay: DISPLAY_FORM
        })
    }

    _handleClickFormCancel(){
        this.setState({
            currentDisplay: DISPLAY_LINK
        })
    }

    _handleChangeGroupName(e){
        this.setState({
            groupName: e.target.value
        });
    }

    _handleClickSave(){
        const { beginAddFeedGroup } = this.props;
        const { groupName } = this.state;
        beginAddFeedGroup(groupName);
    }

    _buildLink(){
        return (
            <span>
                <Button 
                    onClick={this._handleClickShowForm}
                    color="grey"
                    size="tiny">
                    <Icon name="plus" />
                    Add Group
                </Button>
            </span>
        );
    }

    _buildForm(){
        const { groupName } = this.state;
        const { isAddingFeedGroup } = this.props;

        let cancelButton = "";
        if(!isAddingFeedGroup){
            cancelButton = <Button 
                                inverted
                                color="orange"
                                size="tiny"
                                onClick={this._handleClickFormCancel}>
                                <Icon name="cancel"/>
                                Cancel
                            </Button>;
        }
        return (
            <span>
                <input 
                    autoFocus 
                    onChange={this._handleChangeGroupName}
                    placeholder="New group..."
                    value={groupName}
                    disabled={isAddingFeedGroup}/>
                <Button 
                    inverted
                    color="green"
                    size="tiny"
                    onClick={this._handleClickSave}
                    loading={isAddingFeedGroup}>
                    <Icon name="save"/>
                    Add
                </Button>
                {cancelButton}
            </span>
        );
    }

    render() {
        const { currentDisplay } = this.state;

        let content = "";
        if(currentDisplay === DISPLAY_LINK){
            content = this._buildLink();
        } else if(currentDisplay === DISPLAY_FORM){
            content = this._buildForm();
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    const { feedgroups } = state;
    return {
        isAddingFeedGroup: feedgroups.isAddingFeedGroup
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        beginAddFeedGroup: (newGroupName)=>dispatch(beginAddFeedGroup(newGroupName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGroup);