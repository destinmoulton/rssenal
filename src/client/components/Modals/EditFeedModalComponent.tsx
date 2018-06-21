import * as React from "react";

import { Button, Header, Icon, Modal } from "semantic-ui-react";
import SelectFolder from "./SelectFolder";

import { TFolderID, TFolders } from "../../types";

export interface IEditFeedModalMapDispatch {
    feedInitiateUpdate: (feedInfo: any) => void;
}

export interface IEditFeedModalMapState {
    folders: TFolders;
}

interface IEditFeedModalProps {
    isModalOpen: boolean;
    onCloseModal: () => void;
    feed: any;
}

type TAllProps = IEditFeedModalMapDispatch &
    IEditFeedModalMapState &
    IEditFeedModalProps;

interface IState {
    newFeed: any;
}

class EditFeedModalComponent extends React.Component<TAllProps, IState> {
    state: IState = {
        newFeed: { title: "" }
    };

    static getDerivedStateFromProps(props: TAllProps, state: IState) {
        if (props.feed) {
            return {
                newFeed: props.feed
            };
        }
        return null;
    }

    _handleClose = () => {
        this.setState({
            newFeed: {}
        });

        this.props.onCloseModal();
    };

    _handleSave = () => {
        const { newFeed } = this.state;

        if (newFeed.name !== "") {
            this.props.feedInitiateUpdate(newFeed);
            this._handleClose();
        }
    };

    _handleInputKeyPress = (e: any) => {
        if (e.key === "Enter") {
            this._handleSave();
        }
    };

    _handleInputOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { newFeed } = this.state;
        newFeed.title = e.currentTarget.value;
        this.setState({
            newFeed
        });
    };

    _handleSelectFolderChange = (folderId: TFolderID) => {
        const { newFeed } = this.state;
        newFeed.folder_id = folderId;

        this.setState({
            newFeed
        });
    };

    _buildEditInput() {
        const { newFeed } = this.state;
        const { folders } = this.props;

        return (
            <div>
                <label>Feed Name</label>
                <input
                    autoFocus
                    value={newFeed.title}
                    placeholder="Feed name..."
                    onKeyPress={this._handleInputKeyPress}
                    onChange={this._handleInputOnChange}
                    className="rss-editfeed-input"
                />
                <br />
                <br />
                <label>Folder</label>
                <br />
                <SelectFolder
                    selectedValue={newFeed.folder_id}
                    onChange={this._handleSelectFolderChange}
                    folders={folders}
                />
            </div>
        );
    }

    _buildButtons() {
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
                    content="Save"
                    icon="save"
                    inverted
                    onClick={this._handleSave}
                />
            </div>
        );
    }

    render() {
        const { isModalOpen } = this.props;
        const form = this._buildEditInput();

        const buttons = this._buildButtons();
        return (
            <span>
                <Modal
                    open={isModalOpen}
                    onClose={this._handleClose}
                    size="tiny"
                    className="rss-modal"
                >
                    <Header icon="pencil" content="Edit Feed" />
                    <Modal.Content>{form}</Modal.Content>
                    <Modal.Actions>{buttons}</Modal.Actions>
                </Modal>
            </span>
        );
    }
}

export default EditFeedModalComponent;
