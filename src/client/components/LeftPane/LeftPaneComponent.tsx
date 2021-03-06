import debug from "debug";
import * as React from "react";

import { Icon } from "semantic-ui-react";

import AddFeedModalContainer from "../../containers/Modals/AddFeedModalContainer";
import ButtonBarContainer from "../../containers/LeftPane/ButtonBarContainer";
import EditFeedModalContainer from "../../containers/Modals/EditFeedModalContainer";
import EditFolderModalContainer from "../../containers/Modals/EditFolderModalContainer";
import FolderItemContainer from "../../containers/LeftPane/FolderItemContainer";

import { propertyComparator } from "../../lib/sort";

import * as Types from "../../types";

const log = debug("rssenal:LeftPaneComponent");

export interface ILeftPaneMapState {
    feeds: Types.TFeeds;
    hasFolders: boolean;
    folders: Types.TFolders;
}

export interface ILeftPaneMapDispatch {
    foldersGetAll: () => void;
    feedsGetAll: () => Promise<void>;
}

type IAllProps = ILeftPaneMapDispatch & ILeftPaneMapState;

interface ILeftPaneState {
    addFeedModalOpen: boolean;
    editFeed: Types.IFeed;
    editFeedModalOpen: boolean;
    editFolder: Types.IFolder;
    editFolderModalOpen: boolean;
}
class LeftPaneComponent extends React.Component<IAllProps, ILeftPaneState> {
    state: ILeftPaneState = {
        addFeedModalOpen: false,
        editFeed: null,
        editFeedModalOpen: false,
        editFolder: null,
        editFolderModalOpen: false
    };

    componentDidMount() {
        this._reloadData();
    }

    _reloadData = async () => {
        const { foldersGetAll, feedsGetAll, hasFolders } = this.props;

        if (!hasFolders) {
            try {
                foldersGetAll();

                await feedsGetAll();
            } catch (err) {
                throw err;
            }
        }
    };

    _handleOpenAddFeedModal = (feed: Types.IFeed) => {
        this.setState({
            editFeed: feed,
            addFeedModalOpen: true
        });
    };

    _handleCloseAddFeedModal = () => {
        this.setState({
            addFeedModalOpen: false
        });
    };

    _handleOpenEditFolderModal = (folder: Types.IFolder) => {
        this.setState({
            editFolder: folder,
            editFolderModalOpen: true
        });
    };

    _handleCloseEditFolderModal = () => {
        this.setState({
            editFolder: null,
            editFolderModalOpen: false
        });
    };

    _handleOpenEditFeedModal = (feed: Types.IFeed) => {
        this.setState({
            editFeed: feed,
            editFeedModalOpen: true
        });
    };

    _handleCloseEditFeedModal = () => {
        this.setState({
            editFeed: null,
            editFeedModalOpen: false
        });
    };

    render() {
        const {
            addFeedModalOpen,
            editFeed,
            editFeedModalOpen,
            editFolder,
            editFolderModalOpen
        } = this.state;

        const { folders } = this.props;
        const sortedFolders = folders
            .sort((a: Types.IFolder, b: Types.IFolder) =>
                propertyComparator<Types.IFolder, number>(
                    a,
                    b,
                    "asc",
                    "order",
                    false
                )
            )
            .toArray();
        sortedFolders.unshift({ name: "All", _id: "all", order: -1 });

        let listFolders = sortedFolders.map(folder => {
            return (
                <div key={folder._id}>
                    <FolderItemContainer
                        folder={folder}
                        editFolder={this._handleOpenEditFolderModal}
                        editFeed={this._handleOpenEditFeedModal}
                    />
                </div>
            );
        });

        return (
            <div>
                <div>
                    <ButtonBarContainer
                        openEditFolderModal={this._handleOpenEditFolderModal}
                        openAddFeedModal={this._handleOpenAddFeedModal}
                    />
                    <AddFeedModalContainer
                        isModalOpen={addFeedModalOpen}
                        onCloseModal={this._handleCloseAddFeedModal}
                    />
                    <EditFolderModalContainer
                        isModalOpen={editFolderModalOpen}
                        onCloseModal={this._handleCloseEditFolderModal}
                        folder={editFolder}
                    />
                    <EditFeedModalContainer
                        isModalOpen={editFeedModalOpen}
                        onCloseModal={this._handleCloseEditFeedModal}
                        feed={editFeed}
                    />
                </div>
                <div className="rss-leftmenu-folders-box">{listFolders}</div>
                <div className="rss-leftmenu-logo">
                    <Icon name="rss" />
                    &nbsp;RSSenal
                </div>
            </div>
        );
    }
}

export default LeftPaneComponent;
