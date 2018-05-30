import * as React from "react";

import { Button, Icon, Popup } from "semantic-ui-react";

import LogoutButtonContainer from "../../containers/LeftMenu/LogoutButtonContainer";
import ReorderFoldersModal from "../Modals/ReorderFoldersModal";

export interface IButtonBarComponentProps {
    openAddFeedModal?: (newFeed: object) => void;
    openEditFolderModal?: (folderDefault: object) => void;
    refreshAllFeeds?: () => void;
}

class ButtonBarComponent extends React.Component<IButtonBarComponentProps> {
    constructor(props: IButtonBarComponentProps) {
        super(props);

        this._handleClickRefresh = this._handleClickRefresh.bind(this);
    }

    _handleAddFolder() {
        this.props.openEditFolderModal({ _id: "", name: "" });
    }

    _handleAddFeed() {
        this.props.openAddFeedModal({ _id: "", title: "" });
    }

    _handleClickRefresh() {
        this.props.refreshAllFeeds();
    }

    render() {
        return (
            <div className="rss-leftmenu-buttonbar-container">
                <Button.Group size="mini">
                    <Popup
                        trigger={
                            <Button
                                className="rss-leftmenu-button-addrss"
                                onClick={this._handleAddFeed.bind(this)}
                            >
                                <Icon name="plus" />
                                <Icon name="rss" />
                            </Button>
                        }
                        content="Add RSS Feed"
                    />
                    <Popup
                        trigger={
                            <Button
                                className="rss-leftmenu-button-addfolder"
                                onClick={this._handleAddFolder.bind(this)}
                            >
                                <Icon name="plus" />
                                <Icon name="folder" />
                            </Button>
                        }
                        content="Add Folder"
                    />
                </Button.Group>
                <ReorderFoldersModal />
                <Popup
                    trigger={
                        <Button
                            className="rss-leftmenu-button-reload"
                            icon="refresh"
                            onClick={this._handleClickRefresh}
                            size="mini"
                        />
                    }
                    content="Reload All Feeds"
                />
                <LogoutButtonContainer />
            </div>
        );
    }
}

export default ButtonBarComponent;
