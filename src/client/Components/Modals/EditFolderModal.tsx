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
    editFolder: any;
}

const INITIAL_FOLDER = {name:"", _id:""};


class EditFolderModal extends React.Component<IFolderEditorModalProps> {

    state: IFolderEditorModalState = {
        editFolder: INITIAL_FOLDER
    }

    constructor(props: IFolderEditorModalProps){
        super(props);

        this._handleClose = this._handleClose.bind(this);
        this._handleSave = this._handleSave.bind(this);
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleInputOnChange = this._handleInputOnChange.bind(this);
    }

    componentDidCatch(error: Error, info: any){
        console.error(error, info);
    }

    componentWillReceiveProps(nextProps: IFolderEditorModalProps){
        if(this.props.isSavingFolder && !nextProps.isSavingFolder){
            this._handleClose();
        }

        if(nextProps.folder.name !==""){
            this.setState({
                editFolder: nextProps.folder
            });
        } else if (nextProps.folder === null){
            this.setState({
                editFolder: INITIAL_FOLDER
            });
        }
    }
    
    _handleClose(){
        this.setState({
            editFolder: INITIAL_FOLDER
        });
        this.props.onCloseModal();
    }

    _handleSave(){
        const { editFolder } = this.state;

        if(editFolder.name !== ""){
            this.props.beginSaveFolder(editFolder);
        }
    }

    _handleInputKeyPress(e: any){
        if(e.key === "Enter"){
            this._handleSave();
        }
    }

    _handleInputOnChange(e: any){
        const { editFolder } = this.state;
        editFolder.name = e.target.value;
        this.setState({
            editFolder
        });
    }

    _buildEditInput(){
        const { editFolder } = this.state;
        const { isSavingFolder } = this.props;

        return (
            <input
                autoFocus
                value={editFolder.name}
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
                            />;
        }

        let saveButton = <Button 
                            color="green"
                            content="Create"
                            icon="checkmark"
                            inverted
                            loading={isSavingFolder}
                            onClick={this._handleSave}
                        />;

        return [cancelButton, saveButton];
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