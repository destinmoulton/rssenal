import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import { Button, Header, Icon, Modal } from "semantic-ui-react";

import { beginSaveFeedGroup } from "../../redux/actions/feedgroups.actions";

class GroupEditorModal extends Component {
    static propTypes = {
        isModalOpen: PropTypes.bool.isRequired,
        onCloseModal: PropTypes.func.isRequired,
        group: PropTypes.object.isRequired
    }

    constructor(props){
        super(props);

        this.state = {
            newGroup: {}
        }
        
        this._handleClose = this._handleClose.bind(this);
        this._handleSave = this._handleSave.bind(this);
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleInputOnChange = this._handleInputOnChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.isSavingFeedGroup && !nextProps.isSavingFeedGroup){
            this._handleClose();
        }
        this.setState({
            newGroup: nextProps.group
        });
    }
    
    _handleClose(){
        this.setState({
            newGroup: {}
        });

        this.props.onCloseModal();
    }

    _handleSave(){
        const { newGroup } = this.state;

        if(newGroup.name !== ""){
            this.props.beginSaveFeedGroup(newGroup);
        }
    }

    _handleInputKeyPress(e){
        if(e.key === "Enter"){
            this._handleSave();
        }
    }

    _handleInputOnChange(e){
        const { newGroup } = this.state;
        newGroup.name = e.target.value;
        this.setState({
            newGroup
        });
    }

    _buildEditInput(){
        const { newGroup } = this.state;
        const { isSavingFeedGroup } = this.props;

        return (
            <input
                autoFocus
                value={newGroup.name}
                placeholder="Group name..."
                onKeyPress={this._handleInputKeyPress}
                onChange={this._handleInputOnChange}
                disabled={isSavingFeedGroup}
            />
        )
    }

    _buildButtons(){
        const { isSavingFeedGroup } = this.props;

        let cancelButton = "";
        if(!isSavingFeedGroup){
            cancelButton = <Button 
                                size="mini"
                                color="orange"
                                inverted
                                onClick={this._handleClose}><Icon name="cancel"/>&nbsp;Cancel</Button>;
        }

        return (
            <span>
                <Button 
                    size="mini"
                    color="green"
                    inverted
                    onClick={this._handleSave}
                    loading={isSavingFeedGroup}><Icon name="save"/>&nbsp;Save</Button>
                {cancelButton}
            </span>
        );
    }

    render() {
        const { group, isModalOpen } = this.props;
        const form = this._buildEditInput();

        let modalHeader = "Add Group";
        if(group._id !== ""){
            modalHeader = "Edit Group";
        }

        const buttons = this._buildButtons();
        return (
            <span>
                <Modal
                    open={isModalOpen}
                    onClose={this._handleClickCloseModal}
                    size="small"
                >
                    <Header icon="plus" content={modalHeader} />
                    <Modal.Content>
                        {form}
                    </Modal.Content>
                    <Modal.Actions>
                        {buttons}
                    </Modal.Actions>
                </Modal>
            </span>
        );
    }
}

const mapStateToProps = (state)=>{
    const { feedgroups } = state;
    return {
        isSavingFeedGroup: feedgroups.isSavingFeedGroup
    };
}

const mapDispatchToProps = (dispatch)=>{
    return {
        beginSaveFeedGroup: (groupInfo)=> dispatch(beginSaveFeedGroup(groupInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupEditorModal);