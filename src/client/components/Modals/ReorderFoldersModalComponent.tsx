import debug from "debug";
import * as React from "react";

import { Button, Header, Modal, Popup } from "semantic-ui-react";

import { SortableFolderList } from "./SortableComponents";

import { propertyComparator } from "../../lib/sort";

import { IFolder, TFolders } from "../../types";

const log = debug("rssenal:ReorderFoldersModalComponent");

export interface IReorderFoldersMapState {
    folders: TFolders;
}

export interface IReorderFolderMapDispatch {
    foldersReorder: (foldersArr: IFolder[]) => void;
}

type TAllProps = IReorderFolderMapDispatch & IReorderFoldersMapState;

interface IReorderFoldersModalState {
    sortableFolders: IFolder[];
    isModalOpen: boolean;
}

class ReorderFoldersModalComponent extends React.Component<
    TAllProps,
    IReorderFoldersModalState
> {
    state: IReorderFoldersModalState = {
        sortableFolders: [],
        isModalOpen: false
    };

    componentDidMount() {
        this._prepSortableFolders(this.props.folders);
    }

    componentDidUpdate(prevProps: TAllProps) {
        if (!prevProps.folders.equals(this.props.folders)) {
            this._prepSortableFolders(this.props.folders);
        }
    }

    _prepSortableFolders(folders: TFolders) {
        let tmpArray = folders
            .toArray()
            .sort((a: any, b: any) =>
                propertyComparator(a, b, "asc", "order", false)
            );

        //Remove the "Uncategorized" folder
        tmpArray.pop();

        this.setState({
            sortableFolders: tmpArray
        });
    }

    _handleCloseModal = () => {
        log("_handleCloseModal()");
        this.setState({
            isModalOpen: false
        });
    };

    _handleOpenModal = () => {
        log("_handleOpenModal()");
        this.setState({
            isModalOpen: true
        });
    };

    _handlePressOK = () => {
        log("_handlePressOK()");
        const { sortableFolders } = this.state;
        const orderedFolders = sortableFolders.map((folder, index) => {
            folder.order = index + 1;
            return folder;
        });
        this.props.foldersReorder(orderedFolders);
        this._handleCloseModal();
    };

    _onSortEnd = (reorderedObj: any) => {
        log("_onSortEnd()");
        const newFoldersArray = this._reorderFoldersArray(
            reorderedObj.oldIndex,
            reorderedObj.newIndex
        );

        this.setState({
            sortableFolders: newFoldersArray
        });
    };

    _reorderFoldersArray(previousIndex: number, newIndex: number): IFolder[] {
        const array = this.state.sortableFolders.slice(0);
        if (newIndex >= array.length) {
            let k = newIndex - array.length;
            while (k-- + 1) {
                array.push(undefined);
            }
        }
        array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);

        return array;
    }

    render() {
        log("render()");
        const { sortableFolders, isModalOpen } = this.state;
        return (
            <span>
                <Popup
                    trigger={
                        <Button
                            className="rss-leftmenu-button-reorder"
                            icon="numbered list"
                            onClick={this._handleOpenModal}
                            size="mini"
                        />
                    }
                    content="Reorder Folders"
                />
                <Modal
                    open={isModalOpen}
                    onClose={this._handleCloseModal}
                    size="tiny"
                    className="rss-modal"
                >
                    <Header icon="numbered list" content="Reorder Folders" />
                    <Modal.Content>
                        <div className="rss-sortfolder-list-wrapper">
                            <SortableFolderList
                                items={sortableFolders}
                                onSortEnd={this._onSortEnd}
                            />
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <div>
                            <Button
                                icon="cancel"
                                color="orange"
                                floated="left"
                                inverted
                                content="Cancel"
                                onClick={this._handleCloseModal}
                            />
                            <Button
                                icon="checkmark"
                                inverted
                                color="green"
                                content="Reorder"
                                onClick={this._handlePressOK}
                            />
                        </div>
                    </Modal.Actions>
                </Modal>
            </span>
        );
    }
}

export default ReorderFoldersModalComponent;
