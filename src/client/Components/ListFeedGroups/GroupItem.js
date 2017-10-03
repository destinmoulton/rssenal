import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";


import { Button, Icon } from "semantic-ui-react";

import { beginSaveFeedGroup } from "../../redux/actions/feedgroups.actions";

class GroupItem extends Component {
    static propTypes = {
        group: PropTypes.object.isRequired
    };

    constructor(props){
        super(props);

        this.state = {
            optionsAreVisible: false,
            isEditing: false,
            editGroupName: props.group.name
        }

        this._showOptions = this._showOptions.bind(this);
        this._hideOptions = this._hideOptions.bind(this);
        this._handleClickEdit = this._handleClickEdit.bind(this);
        this._handleClickEditCancel = this._handleClickEditCancel.bind(this);
        this._onChangeGroupNameInput = this._onChangeGroupNameInput.bind(this);
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
        const { editGroupName, group } = this.state;
        this.props.beginSaveFeedGroup(group._id, editGroupName);
    }

    _onChangeGroupNameInput(e){
        this.setState({
            editGroupName: e.target.value
        });
    }

    render(){
        const { group } = this.props;
        const { editGroupName, isEditing, optionsAreVisible } = this.state;

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
                          />
                      </span>;
        }
        let display = group.name;
        if(isEditing){
            display = <input
                          autoFocus
                          value={editGroupName}
                          onChange={this._onChangeGroupNameInput}
                      />
            options = <span>
                          <Button 
                              size="mini"
                              color="green"
                              inverted
                              onClick={this._handleClickEditSave}><Icon name="save"/>&nbsp;Save</Button>
                          <Button 
                              size="mini"
                              color="orange"
                              inverted
                              onClick={this._handleClickEditCancel}><Icon name="cancel"/>&nbsp;Cancel</Button>
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
    return {};
}

const mapDispatchToProps = (dispatch)=>{
    return {
        beginSaveFeedGroup: (groupId, newGroupName)=> dispatch(beginSaveFeedGroup(groupId, newGroupName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupItem);