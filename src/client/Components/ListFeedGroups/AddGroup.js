import React, { Component } from 'react';

import { Button, Icon } from "semantic-ui-react";

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
        return (
            <span>
                <input 
                    autoFocus 
                    onChange={this._handleChangeGroupName}
                    placeholder="New group..."
                    value={groupName}/>
                <Button 
                    inverted
                    color="green"
                    size="tiny">
                    <Icon name="save"/>
                    Add
                </Button>
                <Button 
                    inverted
                    color="orange"
                    size="tiny"
                    onClick={this._handleClickFormCancel}>
                    <Icon name="cancel"/>
                    Cancel
                </Button>
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

export default AddGroup;