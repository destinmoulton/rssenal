import * as React from "react";
import { connect } from "react-redux";

import { Button, Header, Icon, Modal } from "semantic-ui-react";

import { beginSaveFolder } from "../../redux/actions/folders.actions";

import { IDispatch, IFolder, IRootStoreState } from "../../interfaces";

interface IMapStateToProps {
    isSavingFolder: boolean;
}

interface IMapDispatchToProps {
    beginSaveFolder: (folder: any)=>void;
}

interface IGroupEditorModalProps extends IMapDispatchToProps, IMapStateToProps{
    isModalOpen: boolean;
    onCloseModal: ()=>void;
    folder: IFolder
}

interface IGroupEditorModalState {
    newGroup: any;
}

class FolderEditorModal extends React.Component<IGroupEditorModalProps> {

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
        if(this.props.isSavingFolder && !nextProps.isSavingFolder){
            this._handleClose();
        }
        this.setState({
            newGroup: nextProps.folder
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
            this.props.beginSaveFolder(newGroup);
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
        const { isSavingFolder } = this.props;

        return (
            <input
                autoFocus
                value={newGroup.name}
                placeholder="Folder name..."
                onKeyPress={this._handleInputKeyPress}
                onChange={this._handleInputOnChange}
                disabled={isSavingFolder}
            />
        )
    }

    _buildButtons(){
        const { isSavingFolder } = this.props;

        let cancelButton = null;
        if(!isSavingFolder){
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
                    loading={isSavingFolder}
                    onClick={this._handleSave}
                    size="mini"
                />
            </div>
        );
    }

    render() {
        const { folder, isModalOpen } = this.props;
        const form = this._buildEditInput();

        let modalHeader = "Add Folder";
        
        if(folder && folder._id !== ""){
            modalHeader = "Edit Folder";
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
    const { folders } = state;
    return {
        isSavingFolder: folders.isSavingFolder
    };
}

const mapDispatchToProps = (dispatch: IDispatch): IMapDispatchToProps=>{
    return {
        beginSaveFolder: (groupInfo)=> dispatch(beginSaveFolder(groupInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FolderEditorModal);