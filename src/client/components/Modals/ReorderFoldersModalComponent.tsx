import * as React from "react";

import { Button, Header, Modal, Popup } from "semantic-ui-react";

import { SortableFolderList } from "./SortableComponents";

import { propertyComparator } from "../../lib/sort";

import { IFolder, TFolders } from "../../types";

export interface IReorderFoldersMapState {
    folders: TFolders;
}

export interface IReorderFolderMapDispatch {
    beginReorderFolders: (foldersArr: IFolder[]) => void;
}

type TAllProps = IReorderFolderMapDispatch & IReorderFoldersMapState;

interface IReorderFoldersModalState {
    foldersAsArray: IFolder[];
    isModalOpen: boolean;
}

class ReorderFoldersModalComponent extends React.Component<
    TAllProps,
    IReorderFoldersModalState
> {
    state: IReorderFoldersModalState = {
        foldersAsArray: [],
        isModalOpen: false
    };

    static getDerivedStateFromProps(props: TAllProps) {
        let tmpArray = props.folders
            .toArray()
            .sort((a, b) => propertyComparator(a, b, "asc", "order", false));
        //Remove the "Uncategorized" folder
        tmpArray.pop();

        return {
            foldersAsArray: tmpArray
        };
    }

    _handleCloseModal = () => {
        this.setState({
            isModalOpen: false
        });
    };

    _handleOpenModal = () => {
        this.setState({
            isModalOpen: true
        });
    };

    _handlePressOK = () => {
        const { foldersAsArray } = this.state;
        const orderedFolders = foldersAsArray.map((folder, index) => {
            folder.order = index + 1;
            return folder;
        });
        this.props.beginReorderFolders(orderedFolders);
        this._handleCloseModal();
    };

    _onSortEnd = (reorderedObj: any) => {
        const newFoldersArray = this._reorderFoldersArray(
            reorderedObj.oldIndex,
            reorderedObj.newIndex
        );
        this.setState({
            foldersAsArray: newFoldersArray
        });
    };

    _reorderFoldersArray(previousIndex: number, newIndex: number): IFolder[] {
        const array = this.state.foldersAsArray.slice(0);
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
        const { foldersAsArray, isModalOpen } = this.state;
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
                        <SortableFolderList
                            items={foldersAsArray}
                            onSortEnd={this._onSortEnd}
                        />
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
