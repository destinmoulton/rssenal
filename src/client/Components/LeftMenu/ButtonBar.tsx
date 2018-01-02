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
                    content="Feed"
                    icon="plus"
                    onClick={this._handleAddFeed.bind(this)}
                    size="tiny"
                />
                <Button
                    color="olive"
                    content="Folder"
                    icon="plus"
                    onClick={this._handleAddFolder.bind(this)}
                    size="tiny"
                />
                <ReorderFoldersModal />
            </div>
        );
    }
}

export default ButtonBar;
