import * as React from "react";

import { Button, Icon, Popup } from "semantic-ui-react";

import LogoutButtonContainer from "../../containers/LeftMenu/LogoutButtonContainer";
import ReorderFoldersModal from "../Modals/ReorderFoldersModal";

export interface IButtonBarMapState {}
export interface IButtonBarMapDispatch {
    refreshAllFeeds: () => void;
}

interface IButtonBarProps {
    openAddFeedModal: (newFeed: object) => void;
    openEditFolderModal: (folderDefault: object) => void;
}

type TAll = IButtonBarProps & IButtonBarMapState & IButtonBarMapDispatch;

class ButtonBarComponent extends React.Component<TAll> {
    _handleAddFolder = () => {
        this.props.openEditFolderModal({ _id: "", name: "" });
    };

    _handleAddFeed = () => {
        this.props.openAddFeedModal({ _id: "", title: "" });
    };

    _handleClickRefresh = () => {
        this.props.refreshAllFeeds();
    };

    render() {
        return (
            <div className="rss-leftmenu-buttonbar-container">
                <Button.Group size="mini">
                    <Popup
                        trigger={
                            <Button
                                className="rss-leftmenu-button-addrss"
                                onClick={this._handleAddFeed}
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
                                onClick={this._handleAddFolder}
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
