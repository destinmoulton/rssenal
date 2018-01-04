import { Map, OrderedMap } from "immutable";
import * as React from "react";
import { connect } from "react-redux";
import { Button, Confirm, Icon, SemanticICONS } from "semantic-ui-react";

import ListFeeds from "./ListFeeds";

import {
    beginDeleteFolder,
    beginSaveFolder
} from "../../redux/actions/folders.actions";
import { changeFilter } from "../../redux/actions/filter.actions";

import {
    IDispatch,
    IFeed,
    IFolder,
    IFilter,
    IRootStoreState,
    TFolderID,
    TFeedID,
    TFeeds
} from "../../interfaces";

interface IMapStateProps {
    filter: IFilter;
    unreadMapGroups: Map<TFolderID, number>;
    feeds: TFeeds;
}

interface IMapDispatchProps {
    beginDeleteFolder: (folderId: TFolderID) => void;
    changeFilter: (filter: IFilter) => void;
}

interface IFolderItemProps extends IMapStateProps, IMapDispatchProps {
    editFeed: (feed: IFeed) => void;
    editFolder: (currentFolder: IFolder) => void;
    folder: IFolder;
}

interface IFolderItemState {
    feedsAreVisible: boolean;
    optionsAreVisible: boolean;
}

class FolderItem extends React.Component<IFolderItemProps> {
    state: IFolderItemState = {
        feedsAreVisible: false,
        optionsAreVisible: false
    };

    constructor(props: IFolderItemProps) {
        super(props);

        this._showOptions = this._showOptions.bind(this);
        this._hideOptions = this._hideOptions.bind(this);
        this._handleClickDelete = this._handleClickDelete.bind(this);
        this._handleClickEdit = this._handleClickEdit.bind(this);
        this._handleClickFolder = this._handleClickFolder.bind(this);
        this._handleToggleFeedsVisible = this._handleToggleFeedsVisible.bind(
            this
        );
    }

    _showOptions() {
        const { folder } = this.props;

        if (folder._id != "0") {
            this.setState({
                optionsAreVisible: true
            });
        }
    }

    _hideOptions() {
        this.setState({
            optionsAreVisible: false
        });
    }

    _handleClickEdit() {
        this.props.editFolder(this.props.folder);
    }

    _handleClickDelete() {
        const { beginDeleteFolder, folder } = this.props;
        const conf = confirm(
            `Are you sure you want to delete this (${folder.name}) folder?`
        );
        if (conf) {
            beginDeleteFolder(folder._id);
        }
    }

    _handleClickFolder() {
        const { changeFilter, folder } = this.props;

        changeFilter({
            limit: "folder",
            id: folder._id
        });
    }

    _handleToggleFeedsVisible() {
        this.setState({
            feedsAreVisible: !this.state.feedsAreVisible
        });
    }

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
                    onMouseEnter={this._showOptions}
                    onMouseLeave={this._hideOptions}
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

const mapStateToProps = (state: IRootStoreState): IMapStateProps => {
    const { feeds, filter } = state;

    return {
        filter: filter.filter,
        unreadMapGroups: feeds.unreadMap.folders,
        feeds: feeds.feeds
    };
};

const mapDispatchToProps = (dispatch: IDispatch): IMapDispatchProps => {
    return {
        beginDeleteFolder: (folderId: TFolderID) =>
            dispatch(beginDeleteFolder(folderId)),
        changeFilter: (newFilter: IFilter) => dispatch(changeFilter(newFilter))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FolderItem);
