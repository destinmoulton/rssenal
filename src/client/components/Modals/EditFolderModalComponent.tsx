import debug from "debug";
import * as React from "react";

import { Button, Header, Modal } from "semantic-ui-react";

import { IFolder } from "../../types";

const log = debug("rssenal:EditFolderModalComponent");

export interface IEditFolderModalMapDispatch {
    folderSave: (folder: any) => void;
}

interface IEditFolderModalProps {
    isModalOpen: boolean;
    onCloseModal: () => void;
    folder: IFolder;
}

type TAllProps = IEditFolderModalMapDispatch & IEditFolderModalProps;

interface IState {
    folderInfo: any;
}

const INITIAL_FOLDER = { name: "", _id: "" };

class EditFolderModalComponent extends React.Component<TAllProps, IState> {
    state: IState = {
        folderInfo: INITIAL_FOLDER
    };

    static getDerivedStateFromProps(props: TAllProps, state: IState) {
        if (props.folder) {
            return {
                folderInfo: props.folder
            };
        }

        return null;
    }

    _handleClose = () => {
        log("_handleClose()");
        this.setState({
            folderInfo: INITIAL_FOLDER
        });
        this.props.onCloseModal();
    };

    _handleSave = () => {
        log("_handleSave()");
        const { folderInfo } = this.state;

        if (folderInfo.name.trim() !== "") {
            this.props.folderSave(folderInfo);
            this._handleClose();
        }
    };

    _handleInputKeyPress = (e: any) => {
        if (e.key === "Enter") {
            this._handleSave();
        }
    };

    _handleInputOnChange = (e: any) => {
        const { folderInfo } = this.state;
        folderInfo.name = e.target.value;
        this.setState({
            folderInfo
        });
    };

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
        log("render()");
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

export default EditFolderModalComponent;
