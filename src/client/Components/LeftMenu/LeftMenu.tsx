import { OrderedMap } from "immutable";
import * as React from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";

import { getAllFolders } from "../../redux/actions/folders.actions";
import { getAllFeeds } from "../../redux/actions/feeds.actions";

import AddFeedModal from "../Modals/AddFeedModal";
import ButtonBar from "./ButtonBar";
import EditFeedModal from "../Modals/EditFeedModal";
import EditFolderModal from "../Modals/EditFolderModal";
import FolderItem from "./FolderItem";

import { propertyComparator } from "../../lib/sort";

import {
    TFeeds,
    IFeed,
    IFolder,
    IDispatch,
    IRootStoreState,
    TFeedID,
    TFolderID
} from "../../interfaces";

interface IMapStateProps {
    feeds: TFeeds;
    hasFolders: boolean;
    folders: OrderedMap<TFolderID, IFolder>;
}

interface IMapDispatchProps {
    getAllFolders: () => void;
    getAllFeeds: () => void;
}

interface ILeftMenuProps extends IMapStateProps, IMapDispatchProps {}

interface ILeftMenuState {
    addFeedModalOpen: boolean;
    editFeed: IFeed;
    editFeedModalOpen: boolean;
    editFolder: IFolder;
    editFolderModalOpen: boolean;
}
class LeftMenu extends React.Component<ILeftMenuProps> {
    state: ILeftMenuState = {
        addFeedModalOpen: false,
        editFeed: null,
        editFeedModalOpen: false,
        editFolder: null,
        editFolderModalOpen: false
    };

    constructor(props: ILeftMenuProps) {
        super(props);

        this._handleCloseAddFeedModal = this._handleCloseAddFeedModal.bind(
            this
        );
        this._handleCloseEditFeedModal = this._handleCloseEditFeedModal.bind(
            this
        );
        this._handleCloseEditFolderModal = this._handleCloseEditFolderModal.bind(
            this
        );
        this._handleOpenAddFeedModal = this._handleOpenAddFeedModal.bind(this);
        this._handleOpenEditFeedModal = this._handleOpenEditFeedModal.bind(
            this
        );
        this._handleOpenEditFolderModal = this._handleOpenEditFolderModal.bind(
            this
        );
    }

    componentWillMount() {
        const { getAllFolders, getAllFeeds, hasFolders } = this.props;

        if (!hasFolders) {
            getAllFolders();
            getAllFeeds();
        }
    }

    _handleOpenAddFeedModal(feed: IFeed) {
        this.setState({
            editFeed: feed,
            addFeedModalOpen: true
        });
    }

    _handleCloseAddFeedModal() {
        this.setState({
            addFeedModalOpen: false
        });
    }

    _handleOpenEditFolderModal(folder: IFolder) {
        this.setState({
            editFolder: folder,
            editFolderModalOpen: true
        });
    }

    _handleCloseEditFolderModal() {
        this.setState({
            editFolder: {},
            editFolderModalOpen: false
        });
    }

    _handleOpenEditFeedModal(feed: IFeed) {
        this.setState({
            editFeed: feed,
            editFeedModalOpen: true
        });
    }

    _handleCloseEditFeedModal() {
        this.setState({
            editFeed: {},
            editFeedModalOpen: false
        });
    }

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
                propertyComparator(a, b, "asc", "order")
            )
            .toArray();
        sortedFolders.unshift({ name: "All", _id: "all", order: -1 });

        let listFolders = sortedFolders.map(folder => {
            return (
                <div key={folder._id}>
                    <FolderItem
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
                    <ButtonBar
                        openEditFolderModal={this._handleOpenEditFolderModal}
                        openAddFeedModal={this._handleOpenAddFeedModal}
                    />
                    <AddFeedModal
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

const mapStateToProps = (state: IRootStoreState): IMapStateProps => {
    const { folders, feeds } = state;

    return {
        feeds: feeds.feeds,
        hasFolders: folders.hasFolders,
        folders: folders.folders
    };
};

const mapDispatchToProps = (dispatch: IDispatch): IMapDispatchProps => {
    return {
        getAllFolders: () => dispatch(getAllFolders()),
        getAllFeeds: () => dispatch(getAllFeeds())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
