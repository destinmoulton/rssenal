import { OrderedMap } from "immutable";
import * as React from "react";

import { Icon } from "semantic-ui-react";

import AddFeedModalContainer from "../../containers/Modals/AddFeedModalContainer";
import ButtonBarContainer from "../../containers/LeftMenu/ButtonBarContainer";
import EditFeedModal from "../Modals/EditFeedModal";
import EditFolderModal from "../Modals/EditFolderModal";
import FolderItemContainer from "../../containers/LeftMenu/FolderItemContainer";

import { propertyComparator } from "../../lib/sort";

import { TFeeds, IFeed, IFolder, TFeedID, TFolderID } from "../../interfaces";

export interface ILeftMenuMapState {
    feeds: TFeeds;
    hasFolders: boolean;
    folders: OrderedMap<TFolderID, IFolder>;
}

export interface ILeftMenuMapDispatch {
    getAllFolders: () => void;
    getAllFeeds: () => void;
}

type IAllProps = ILeftMenuMapDispatch & ILeftMenuMapState;

interface ILeftMenuState {
    addFeedModalOpen: boolean;
    editFeed: IFeed;
    editFeedModalOpen: boolean;
    editFolder: IFolder;
    editFolderModalOpen: boolean;
}
class LeftMenuComponent extends React.Component<IAllProps, ILeftMenuState> {
    state: ILeftMenuState = {
        addFeedModalOpen: false,
        editFeed: null,
        editFeedModalOpen: false,
        editFolder: null,
        editFolderModalOpen: false
    };

    componentDidMount() {
        const { getAllFolders, getAllFeeds, hasFolders } = this.props;

        if (!hasFolders) {
            getAllFolders();
            getAllFeeds();
        }
    }

    _handleOpenAddFeedModal = (feed: IFeed) => {
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

    _handleOpenEditFolderModal = (folder: IFolder) => {
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

    _handleOpenEditFeedModal = (feed: IFeed) => {
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
            .sort((a: IFolder, b: IFolder) =>
                propertyComparator<IFolder, number>(a, b, "asc", "order")
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
                    <EditFolderModal
                        isModalOpen={editFolderModalOpen}
                        onCloseModal={this._handleCloseEditFolderModal}
                        folder={editFolder}
                    />
                    <EditFeedModal
                        isModalOpen={editFeedModalOpen}
                        onCloseModal={this._handleCloseEditFeedModal}
                        feed={editFeed}
                    />
                </div>
                <div className="rss-leftmenu-folders-box">{listFolders}</div>
                <div className="rss-leftmenu-logo">
                    <Icon name="rss" />&nbsp;RSSenal
                </div>
            </div>
        );
    }
}

export default LeftMenuComponent;
