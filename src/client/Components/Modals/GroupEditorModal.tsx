import * as React from "react";
import { connect } from "react-redux";

import { Button, Header, Icon, Modal } from "semantic-ui-react";

import { beginSaveFeedGroup } from "../../redux/actions/feedgroups.actions";

import { IDispatch, IFeedgroup, IRootStoreState } from "../../interfaces";

interface IMapStateToProps {
    isSavingFeedGroup: boolean;
}

interface IMapDispatchToProps {
    beginSaveFeedGroup: (group: any)=>void;
}

interface IGroupEditorModalProps extends IMapDispatchToProps, IMapStateToProps{
    isModalOpen: boolean;
    onCloseModal: ()=>void;
    group: IFeedgroup
}

interface IGroupEditorModalState {
    newGroup: any;
}

class GroupEditorModal extends React.Component<IGroupEditorModalProps> {

    state: IGroupEditorModalState = {
        newGroup: {}
    }

    constructor(props: IGroupEditorModalProps){
        super(props);

        this._handleClose = this._handleClose.bind(this);
        this._handleSave = this._handleSave.bind(this);
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleInputOnChange = this._handleInputOnChange.bind(this);
    }

    componentWillReceiveProps(nextProps: IGroupEditorModalProps){
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

    _handleInputKeyPress(e: any){
        if(e.key === "Enter"){
            this._handleSave();
        }
    }

    _handleInputOnChange(e: any){
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

        let cancelButton = null;
        if(!isSavingFeedGroup){
            cancelButton = <Button
                                color="orange"
                                content="Cancel"
                                floated="left"
                                icon="cancel"
                                inverted
                                onClick={this._handleClose}
                                size="mini"
                            />;
        }

        return (
            <div>
                {cancelButton}
                <Button 
                    color="green"
                    content="Save"
                    icon="save"
                    floated="right"
                    inverted
                    loading={isSavingFeedGroup}
                    onClick={this._handleSave}
                    size="mini"
                />
            </div>
        );
    }

    render() {
        const { group, isModalOpen } = this.props;
        const form = this._buildEditInput();

        let modalHeader = "Add Group";
        
        if(group && group._id !== ""){
            modalHeader = "Edit Group";
        }

        const buttons = this._buildButtons();
        return (
            <span>
                <Modal
                    open={isModalOpen}
                    onClose={this._handleClose}
                    size="tiny"
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

const mapStateToProps = (state: IRootStoreState): IMapStateToProps=>{
    const { feedgroups } = state;
    return {
        isSavingFeedGroup: feedgroups.isSavingFeedGroup
    };
}

const mapDispatchToProps = (dispatch: IDispatch): IMapDispatchToProps=>{
    return {
        beginSaveFeedGroup: (groupInfo)=> dispatch(beginSaveFeedGroup(groupInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupEditorModal);