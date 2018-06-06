import * as React from "react";

import {
    Button,
    Form,
    Icon,
    Header,
    Message,
    Modal,
    Segment
} from "semantic-ui-react";
import SelectFolder from "./SelectFolder";

import { API_FEEDVALIDATION_BASE } from "../../redux/apiendpoints";
import { generateJWTJSONHeaders } from "../../lib/headers";

import { IFeed, TFolderID, TFolders } from "../../interfaces";

export interface IAddFeedModalMapState {
    folders: TFolders;
}

export interface IAddFeedModalMapDispatch {
    beginAddFeed: (feedInfo: any) => void;
}

interface IAddFeedModalProps {
    isModalOpen: boolean;
    onCloseModal: () => void;
}

type TAllProps = IAddFeedModalMapState &
    IAddFeedModalMapDispatch &
    IAddFeedModalProps;

const DISPLAY_FORM = "FORM";
const DISPLAY_FEED = "FEED";

interface IAddFeedModalState {
    display: string;
    feedInfo: any;
    feedURL: string;
    folderId: TFolderID;
    formError: string;
    isValidatingURL: boolean;
}
const INITIAL_STATE: IAddFeedModalState = {
    display: DISPLAY_FORM,
    feedInfo: null,
    feedURL: "",
    folderId: "0",
    formError: "",
    isValidatingURL: false
};

class AddFeedModalComponent extends React.Component<
    TAllProps,
    IAddFeedModalState
> {
    state = INITIAL_STATE;

    _handleChangeURLInput = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            feedURL: e.currentTarget.value
        });
    };

    _handleClickContinue = () => {
        const { feedURL } = this.state;

        if (feedURL !== "") {
            this.setState({
                isValidatingURL: true
            });

            this._serverValidateURL();
        }
    };

    _handleClose = () => {
        this.setState(INITIAL_STATE);

        this.props.onCloseModal();
    };

    _handleClickAddFeed = () => {
        const { feedInfo, folderId, feedURL } = this.state;

        const dataToAdd = {
            title: feedInfo.title,
            description: feedInfo.description,
            link: feedInfo.link,
            folder_id: folderId,
            url: feedURL
        };
        this.props.beginAddFeed(dataToAdd);
        this._handleClose();
    };

    _handleSelectFolder = (folderId: TFolderID) => {
        this.setState({
            folderId
        });
    };

    _transitionToDisplayForm = () => {
        this.setState({
            display: DISPLAY_FORM,
            feedInfo: {},
            folderId: "0",
            isValidatingURL: false
        });
    };

    _transitionToDisplayFeed = (feedObj: IFeed) => {
        this.setState({
            display: DISPLAY_FEED,
            feedInfo: feedObj,
            formError: ""
        });
    };

    _serverValidateURL() {
        const { feedURL } = this.state;

        const url = API_FEEDVALIDATION_BASE;
        const init = {
            headers: generateJWTJSONHeaders(),
            method: "POST",
            body: JSON.stringify({ feedURL })
        };

        fetch(url, init)
            .then(res => {
                return res.json();
            })
            .then(resObj => {
                if (resObj.status === "error") {
                    throw new Error(
                        "The feed address does not seem to be valid. Try again."
                    );
                } else if (resObj.status === "success") {
                    return resObj.feedInfo;
                }
            })
            .then(feed => {
                this._transitionToDisplayFeed(feed);
            })
            .catch(err => {
                this.setState({
                    formError: err.message,
                    feedInfo: {},
                    folderId: "0",
                    isValidatingURL: false
                });
            });
    }

    _buildURLForm() {
        const { formError } = this.state;
        let message = null;
        if (formError !== "") {
            message = (
                <Message negative>
                    <Message.Header>{formError}</Message.Header>
                </Message>
            );
        }
        return (
            <Form>
                <Form.Field>
                    <label>Feed Address</label>
                    <input
                        autoFocus
                        placeholder="http://feed.url.here"
                        onChange={this._handleChangeURLInput}
                    />
                </Form.Field>
                {message}
            </Form>
        );
    }

    _buildURLDisplayButtons() {
        const { isValidatingURL } = this.state;
        return (
            <span>
                <Button
                    color="green"
                    onClick={this._handleClickContinue}
                    inverted
                    loading={isValidatingURL}
                >
                    <Icon name="chevron right" />&nbsp;&nbsp;&nbsp;Continue
                </Button>
            </span>
        );
    }

    _buildFeedInfo() {
        const { feedInfo, feedURL } = this.state;
        const { folders } = this.props;

        const description =
            feedInfo.description !== feedInfo.title &&
            feedInfo.description !== ""
                ? feedInfo.description
                : "No description provided.";
        return (
            <div>
                <Header as="h4" attached="top">
                    {feedInfo.title}
                </Header>
                <Header as="h5" attached>
                    {feedURL}
                </Header>
                <Segment attached="bottom">{description}</Segment>

                <Header as="h5" attached="top">
                    Select Feed Folder
                </Header>
                <Segment attached="bottom">
                    <SelectFolder
                        onChange={this._handleSelectFolder}
                        selectedValue={"0"}
                        folders={folders}
                    />
                </Segment>
            </div>
        );
    }

    _buildFeedInfoButtons() {
        return (
            <span>
                <Button
                    color="blue"
                    content="Back"
                    icon="chevron left"
                    inverted
                    onClick={this._transitionToDisplayForm}
                />
                <Button
                    color="green"
                    onClick={this._handleClickAddFeed}
                    inverted
                    icon="checkmark"
                    content="This is it!"
                />
            </span>
        );
    }

    render() {
        const { display } = this.state;

        const { isModalOpen } = this.props;

        let content = null;
        let buttons = null;
        if (display === DISPLAY_FORM) {
            content = this._buildURLForm();
            buttons = this._buildURLDisplayButtons();
        } else if (display === DISPLAY_FEED) {
            content = this._buildFeedInfo();
            buttons = this._buildFeedInfoButtons();
        }

        return (
            <Modal
                open={isModalOpen}
                onClose={this._handleClose}
                size="small"
                className="rss-modal"
            >
                <Header icon="plus" content="Add Feed" />
                <Modal.Content>{content}</Modal.Content>
                <Modal.Actions>
                    <Button
                        color="orange"
                        onClick={this._handleClose}
                        inverted
                        floated="left"
                        icon="close"
                        content="Cancel"
                    />
                    {buttons}
                </Modal.Actions>
            </Modal>
        );
    }
}

export default AddFeedModalComponent;
