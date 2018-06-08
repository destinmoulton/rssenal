import { Map, OrderedMap } from "immutable";
import * as React from "react";

import { Icon, SemanticICONS } from "semantic-ui-react";

import ListFeeds from "./ListFeeds";

import {
    IFeed,
    IFolder,
    IFilter,
    TFolderID,
    TFeedID,
    TFeeds
} from "../../interfaces";

export interface IFolderItemMapState {
    filter: IFilter;
    unreadMapGroups: Map<TFolderID, number>;
    feeds: TFeeds;
}

export interface IFolderItemMapDispatch {
    beginDeleteFolder: (folderId: TFolderID) => void;
    changeFilter: (filter: IFilter) => void;
}

interface IFolderItemProps {
    editFeed: (feed: IFeed) => void;
    editFolder: (currentFolder: IFolder) => void;
    folder: IFolder;
}

type TAllProps = IFolderItemProps &
    IFolderItemMapDispatch &
    IFolderItemMapState;

interface IFolderItemState {
    feedsAreVisible: boolean;
    optionsAreVisible: boolean;
}

class FolderItemComponent extends React.Component<TAllProps, IFolderItemState> {
    state: IFolderItemState = {
        feedsAreVisible: false,
        optionsAreVisible: false
    };

    _handleClickDelete = () => {
        const { beginDeleteFolder, folder } = this.props;
        const conf = confirm(
            `Are you sure you want to delete the '${
                folder.name
            }' folder?\nThe feeds will be moved to 'Uncategorized'.`
        );
        if (conf) {
            beginDeleteFolder(folder._id);
        }
    };

    _handleClickEdit = () => {
        this.props.editFolder(this.props.folder);
    };

    _handleClickFolder = () => {
        const { changeFilter, folder } = this.props;

        changeFilter({
            limit: "folder",
            id: folder._id
        });
    };

    _handleHideOptions = () => {
        this.setState({
            optionsAreVisible: false
        });
    };

    _handleShowOptions = () => {
        const { folder } = this.props;

        if (folder._id != "0") {
            this.setState({
                optionsAreVisible: true
            });
        }
    };

    _handleToggleFeedsVisible = () => {
        this.setState({
            feedsAreVisible: !this.state.feedsAreVisible
        });
    };

    _domOptionButtons() {
        return (
            <div className="rss-folders-folderitem-options">
                <Icon
                    name="pencil"
                    color="green"
                    onClick={this._handleClickEdit}
                />
                <Icon
                    name="trash"
                    color="red"
                    onClick={this._handleClickDelete}
                />
            </div>
        );
    }

    _domFolderTitle() {
        const { folder } = this.props;

        return (
            <div
                className="rss-folders-folderitem-title"
                onClick={this._handleClickFolder}
            >
                {folder.name}
            </div>
        );
    }

    _domUnreadCount() {
        const { folder, unreadMapGroups } = this.props;
        let unread = "";
        if (
            unreadMapGroups.has(folder._id) &&
            unreadMapGroups.get(folder._id) > 0
        ) {
            unread = " [" + unreadMapGroups.get(folder._id) + "]";
        }

        return (
            <div
                className="rss-folders-folderitem-unread"
                onClick={this._handleClickFolder}
            >
                {unread}
            </div>
        );
    }

    _domToggleIcon() {
        const { feedsAreVisible } = this.state;

        var toggleFeedsIconClass: SemanticICONS = feedsAreVisible
            ? "caret down"
            : "caret right";

        return (
            <div className="rss-folders-folderitem-icon">
                <Icon
                    name={toggleFeedsIconClass}
                    onClick={this._handleToggleFeedsVisible}
                />
            </div>
        );
    }

    render() {
        const { editFeed, feeds, filter, folder } = this.props;

        const { feedsAreVisible, optionsAreVisible } = this.state;

        let toggleFeedsIcon = null;
        let title = null;
        let unread = null;
        let options = null;
        let listFeeds = null;

        title = this._domFolderTitle();
        if (folder._id !== "all") {
            toggleFeedsIcon = this._domToggleIcon();

            unread = this._domUnreadCount();
            if (feedsAreVisible) {
                listFeeds = (
                    <ListFeeds
                        folderId={folder._id}
                        editFeed={editFeed}
                        feeds={feeds}
                    />
                );
            }

            if (optionsAreVisible) {
                options = this._domOptionButtons();
            }
        }

        let className = "rss-folders-folderitem";
        if (filter.limit === "folder" && filter.id === folder._id) {
            className += " rss-folders-folderitem-active";
        }

        return (
            <div>
                <div
                    className={className}
                    onMouseEnter={this._handleShowOptions}
                    onMouseLeave={this._handleHideOptions}
                >
                    {toggleFeedsIcon}
                    {title}
                    {unread}
                    {options}
                </div>
                <div className="clear" />
                {listFeeds}
            </div>
        );
    }
}

export default FolderItemComponent;
