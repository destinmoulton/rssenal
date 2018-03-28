import * as React from "react";
import { connect } from "react-redux";

import { Button, Header, Icon, Modal } from "semantic-ui-react";
import SelectFolder from "./SelectFolder";

import { beginUpdateFeed } from "../../redux/actions/feeds.actions";

import { IDispatch, IFeed, IRootStoreState, TFolderID } from "../../interfaces";

interface IMapDispatchToProps {
    beginUpdateFeed: (feedInfo: any) => void;
}

interface IMapStateToProps {}

interface IEditFeedModalProps extends IMapDispatchToProps, IMapStateToProps {
    isModalOpen: boolean;
    onCloseModal: () => void;
    feed: any;
}

interface IEditFeedModalState {
    newFeed: any;
}

class EditFeedModal extends React.Component<IEditFeedModalProps> {
    state: IEditFeedModalState = {
        newFeed: { title: "" }
    };

    constructor(props: IEditFeedModalProps) {
        super(props);

        this._handleClose = this._handleClose.bind(this);
        this._handleSave = this._handleSave.bind(this);
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleInputOnChange = this._handleInputOnChange.bind(this);
        this._handleSelectFolderChange = this._handleSelectFolderChange.bind(
            this
        );
    }

    componentWillReceiveProps(nextProps: IEditFeedModalProps) {
        this.setState({
            newFeed: nextProps.feed
        });
    }

    _handleClose() {
        this.setState({
            newFeed: {}
        });

        this.props.onCloseModal();
    }

    _handleSave() {
        const { newFeed } = this.state;

        if (newFeed.name !== "") {
            this.props.beginUpdateFeed(newFeed);
            this._handleClose();
        }
    }

    _handleInputKeyPress(e: any) {
        if (e.key === "Enter") {
            this._handleSave();
        }
    }

    _handleInputOnChange(e: React.FormEvent<HTMLInputElement>) {
        const { newFeed } = this.state;
        newFeed.title = e.currentTarget.value;
        this.setState({
            newFeed
        });
    }

    _handleSelectFolderChange(folderId: TFolderID) {
        const { newFeed } = this.state;
        newFeed.folder_id = folderId;

        this.setState({
            newFeed
        });
    }

    _buildEditInput() {
        const { newFeed } = this.state;

        return (
            <div>
                <label>Feed Name</label>
                <input
                    autoFocus
                    value={newFeed.title}
                    placeholder="Feed name..."
                    onKeyPress={this._handleInputKeyPress}
                    onChange={this._handleInputOnChange}
                    className="rss-editfeed-input"
                />
                <br />
                <br />
                <label>Folder</label>
                <br />
                <SelectFolder
                    selectedValue={newFeed.folder_id}
                    onChange={this._handleSelectFolderChange}
                />
            </div>
        );
    }

    _buildButtons() {
        return (
            <div>
                <Button
                    color="orange"
                    content="Cancel"
                    floated="left"
                    icon="cancel"
                    inverted
                    onClick={this._handleClose}
                />
                <Button
                    color="green"
                    content="Save"
                    icon="save"
                    inverted
                    onClick={this._handleSave}
                />
            </div>
        );
    }

    render() {
        const { isModalOpen } = this.props;
        const form = this._buildEditInput();

        const buttons = this._buildButtons();
        return (
            <span>
                <Modal
                    open={isModalOpen}
                    onClose={this._handleClose}
                    size="tiny"
                    className="rss-modal"
                >
                    <Header icon="pencil" content="Edit Feed" />
                    <Modal.Content>{form}</Modal.Content>
                    <Modal.Actions>{buttons}</Modal.Actions>
                </Modal>
            </span>
        );
    }
}
const mapStateToProps = (state: IRootStoreState): IMapStateToProps => {
    return {};
};

const mapDispatchToProps = (dispatch: IDispatch): IMapDispatchToProps => {
    return {
        beginUpdateFeed: feedInfo => dispatch(beginUpdateFeed(feedInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFeedModal);
