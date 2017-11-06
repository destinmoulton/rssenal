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

interface IFolderEditorModalProps extends IMapDispatchToProps, IMapStateToProps{
    isModalOpen: boolean;
    onCloseModal: ()=>void;
    folder: IFolder
}

interface IFolderEditorModalState {
    newFolder: any;
}

class EditFolderModal extends React.Component<IFolderEditorModalProps> {

    state: IFolderEditorModalState = {
        newFolder: {}
    }

    constructor(props: IFolderEditorModalProps){
        super(props);

        this._handleClose = this._handleClose.bind(this);
        this._handleSave = this._handleSave.bind(this);
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleInputOnChange = this._handleInputOnChange.bind(this);
    }

    componentWillReceiveProps(nextProps: IFolderEditorModalProps){
        if(this.props.isSavingFolder && !nextProps.isSavingFolder){
            this._handleClose();
        }
        this.setState({
            newFolder: nextProps.folder
        });
    }
    
    _handleClose(){
        this.setState({
            newFolder: {}
        });

        this.props.onCloseModal();
    }

    _handleSave(){
        const { newFolder } = this.state;

        if(newFolder.name !== ""){
            this.props.beginSaveFolder(newFolder);
        }
    }

    _handleInputKeyPress(e: any){
        if(e.key === "Enter"){
            this._handleSave();
        }
    }

    _handleInputOnChange(e: any){
        const { newFolder } = this.state;
        newFolder.name = e.target.value;
        this.setState({
            newFolder
        });
    }

    _buildEditInput(){
        const { newFolder } = this.state;
        const { isSavingFolder } = this.props;

        return (
            <input
                autoFocus
                value={newFolder.name}
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
        beginSaveFolder: (folderInfo)=> dispatch(beginSaveFolder(folderInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditFolderModal);