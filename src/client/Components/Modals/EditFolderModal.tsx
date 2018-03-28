import * as React from "react";
import { connect } from "react-redux";

import { Button, Header, Icon, Modal } from "semantic-ui-react";

import { beginSaveFolder } from "../../redux/actions/folders.actions";

import { IDispatch, IFolder, IRootStoreState } from "../../interfaces";

interface IMapDispatchToProps {
    beginSaveFolder: (folder: any) => void;
}

interface IFolderEditorModalProps extends IMapDispatchToProps {
    isModalOpen: boolean;
    onCloseModal: () => void;
    folder: IFolder;
}

interface IFolderEditorModalState {
    folderInfo: any;
}

const INITIAL_FOLDER = { name: "", _id: "" };

class EditFolderModal extends React.Component<IFolderEditorModalProps> {
    state: IFolderEditorModalState = {
        folderInfo: INITIAL_FOLDER
    };

    constructor(props: IFolderEditorModalProps) {
        super(props);

        this._handleClose = this._handleClose.bind(this);
        this._handleSave = this._handleSave.bind(this);
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleInputOnChange = this._handleInputOnChange.bind(this);
    }

    componentDidCatch(error: Error, info: any) {
        console.error(error, info);
    }

    componentWillReceiveProps(nextProps: IFolderEditorModalProps) {
        this.setState({
            folderInfo: nextProps.folder
        });
    }

    _handleClose() {
        this.setState({
            folderInfo: INITIAL_FOLDER
        });
        this.props.onCloseModal();
    }

    _handleSave() {
        const { folderInfo } = this.state;

        if (folderInfo.name.trim() !== "") {
            this.props.beginSaveFolder(folderInfo);
            this._handleClose();
        }
    }

    _handleInputKeyPress(e: any) {
        if (e.key === "Enter") {
            this._handleSave();
        }
    }

    _handleInputOnChange(e: any) {
        const { folderInfo } = this.state;
        folderInfo.name = e.target.value;
        this.setState({
            folderInfo
        });
    }

    _buildEditInput() {
        const { folderInfo } = this.state;

        return (
            <input
                autoFocus
                value={folderInfo.name}
                placeholder="Folder name..."
                onKeyPress={this._handleInputKeyPress}
                onChange={this._handleInputOnChange}
                className="rss-foldermodal-name"
            />
        );
    }

    _buildButtons(saveText: string) {
        return (
            <div>
                <Button
                    color="orange"
                    content="Cancel"
                    floated="left"
                    icon="cancel"
                    inverted
                    onClick={this._handleClose}
                />
                <Button
                    color="green"
                    content={saveText}
                    icon="checkmark"
                    inverted
                    onClick={this._handleSave}
                />
            </div>
        );
    }

    render() {
        const { folder, isModalOpen } = this.props;
        const form = this._buildEditInput();

        let modalHeader = "Add Folder";

        let saveText = "Create";
        if (folder && folder._id !== "") {
            modalHeader = "Edit Folder";
            saveText = "Save";
        }

        const buttons = this._buildButtons(saveText);
        return (
            <Modal
                open={isModalOpen}
                onClose={this._handleClose}
                size="tiny"
                className="rss-modal"
            >
                <Header icon="plus" content={modalHeader} />
                <Modal.Content>{form}</Modal.Content>
                <Modal.Actions>{buttons}</Modal.Actions>
            </Modal>
        );
    }
}

const mapStateToProps = (state: IRootStoreState) => {
    return {};
};

const mapDispatchToProps = (dispatch: IDispatch): IMapDispatchToProps => {
    return {
        beginSaveFolder: folderInfo => dispatch(beginSaveFolder(folderInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFolderModal);
