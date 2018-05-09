import * as React from "react";
import { connect } from "react-redux";
import { arrayMove } from "react-sortable-hoc";
import { Button, Header, Icon, Modal, Popup } from "semantic-ui-react";

import { SortableFolderItem, SortableFolderList } from "./SortableComponents";

import { beginReorderFolders } from "../../redux/actions/folders.actions";
import { propertyComparator } from "../../lib/sort";

import {
    IDispatch,
    IFolder,
    IRootStoreState,
    TFolders
} from "../../interfaces";

interface IMapStateToProps {
    folders: TFolders;
}

interface IMapDispatchToProps {
    beginReorderFolders: (foldersArr: IFolder[]) => void;
}

interface IReorderFoldersModalProps
    extends IMapStateToProps,
        IMapDispatchToProps {}

interface IReorderFoldersModalState {
    foldersAsArray: IFolder[];
    isModalOpen: boolean;
}

class ReorderFoldersModal extends React.Component<IReorderFoldersModalProps> {
    state: IReorderFoldersModalState = {
        foldersAsArray: [],
        isModalOpen: false
    };

    constructor(props: IReorderFoldersModalProps) {
        super(props);

        this._handleCloseModal = this._handleCloseModal.bind(this);
        this._handleOpenModal = this._handleOpenModal.bind(this);
        this._handlePressOK = this._handlePressOK.bind(this);
        this._onSortEnd = this._onSortEnd.bind(this);
    }

    componentWillReceiveProps(nextProps: IReorderFoldersModalProps) {
        let tmpArray = nextProps.folders
            .toArray()
            .sort((a, b) => propertyComparator(a, b, "asc", "order"));
        //Remove the "Uncategorized" folder
        tmpArray.pop();

        this.setState({
            foldersAsArray: tmpArray
        });
    }

    _handleCloseModal() {
        this.setState({
            isModalOpen: false
        });
    }

    _handleOpenModal() {
        this.setState({
            isModalOpen: true
        });
    }

    _handlePressOK() {
        const { foldersAsArray } = this.state;
        const orderedFolders = foldersAsArray.map((folder, index) => {
            folder.order = index + 1;
            return folder;
        });
        this.props.beginReorderFolders(orderedFolders);
        this._handleCloseModal();
    }

    _onSortEnd(reorderedObj: any) {
        const newFoldersArray = this._reorderFoldersArray(
            reorderedObj.oldIndex,
            reorderedObj.newIndex
        );
        this.setState({
            foldersAsArray: newFoldersArray
        });
    }

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

const mapStateToProps = (state: IRootStoreState): IMapStateToProps => {
    const { folders } = state;
    return {
        folders: folders.folders
    };
};

const mapDispatchToProps = (dispatch: IDispatch): IMapDispatchToProps => {
    return {
        beginReorderFolders: foldersArr =>
            dispatch(beginReorderFolders(foldersArr))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(
    ReorderFoldersModal
);
