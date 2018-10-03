import debug from "debug";
import * as React from "react";

import { Button, Icon, Popup } from "semantic-ui-react";

import LogoutButtonContainer from "../../containers/LeftPane/LogoutButtonContainer";
import ReorderFoldersModalContainer from "../../containers/Modals/ReorderFoldersModalContainer";

const log = debug("rssenal:ButtonBarComponent");

export interface IButtonBarMapState {}
export interface IButtonBarMapDispatch {
    feedsRefreshAll: () => void;
}

interface IButtonBarProps {
    openAddFeedModal: (newFeed: object) => void;
    openEditFolderModal: (folderDefault: object) => void;
}

type TAll = IButtonBarProps & IButtonBarMapState & IButtonBarMapDispatch;

class ButtonBarComponent extends React.Component<TAll> {
    _handleAddFolder = () => {
        log("_handleAddFolder()");
        this.props.openEditFolderModal({ _id: "", name: "" });
    };

    _handleAddFeed = () => {
        log("_handleAddFeed()");
        this.props.openAddFeedModal({ _id: "", title: "" });
    };

    _handleClickRefresh = () => {
        log("_handleClickRefresh()");
        this.props.feedsRefreshAll();
    };

    render() {
        log("render()");
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
                <ReorderFoldersModalContainer />
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
