import * as React from "react";

import { Button, Icon } from "semantic-ui-react";

import ReorderFoldersModal from "../Modals/ReorderFoldersModal";

interface IButtonBarProps {
    openAddFeedModal: (newFeed: object) => void;
    openEditFolderModal: (folderDefault: object) => void;
}

class ButtonBar extends React.Component<IButtonBarProps> {
    _handleAddFolder() {
        this.props.openEditFolderModal({ _id: "", name: "" });
    }

    _handleAddFeed() {
        this.props.openAddFeedModal({ _id: "", title: "" });
    }

    render() {
        return (
            <div className="rss-leftmenu-buttonbar-container">
                <Button
                    color="grey"
                    onClick={this._handleAddFeed.bind(this)}
                    size="tiny"
                >
                    <Icon name="plus" />
                    <Icon name="rss" />Feed
                </Button>
                <Button
                    color="olive"
                    onClick={this._handleAddFolder.bind(this)}
                    size="tiny"
                >
                    <Icon name="plus" />
                    <Icon name="folder" />Folder
                </Button>
                <ReorderFoldersModal />
            </div>
        );
    }
}

export default ButtonBar;
