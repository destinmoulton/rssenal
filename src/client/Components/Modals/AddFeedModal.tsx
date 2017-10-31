import * as React from "react";
import { connect } from "react-redux";

import { Button, Form, Icon, Header, Message, Modal, Segment } from "semantic-ui-react";
import SelectFeedGroup from "./SelectFeedGroup";

import { API_FEEDVALIDATION_BASE } from "../../redux/apiendpoints";

import { beginAddFeed } from "../../redux/actions/feeds.actions";

import { IDispatch, IFeed, IRootStoreState, TFeedgroupID } from "../../interfaces";

interface IAddFeedModalState {
    display: string;
    feedInfo: IFeed;
    isValidatingURL: boolean;
    feedURL: string;
    feedGroupId: TFeedgroupID;
    formError: string;
}

interface IMapStateToProps{
    isAddingFeed: boolean;
}

interface IMapDispatchToProps{
    beginAddFeed: (feedInfo: any)=>void
}

interface IAddFeedModalProps extends IMapStateToProps, IMapDispatchToProps {
    isModalOpen: boolean;
    onCloseModal: ()=>void;
}

const DISPLAY_FORM = "FORM";
const DISPLAY_FEED = "FEED";
const INITIAL_STATE: IAddFeedModalState = {
    display: DISPLAY_FORM,
    feedInfo: null,
    isValidatingURL: false,
    feedURL: "",
    feedGroupId: "0",
    formError: ""
};

class AddFeedModal extends React.Component<IAddFeedModalProps> {

    state = INITIAL_STATE;

    constructor(props: IAddFeedModalProps){
        super(props);

        this._handleClickAddFeed = this._handleClickAddFeed.bind(this);
        this._handleClickContinue = this._handleClickContinue.bind(this);
        this._handleChangeURLInput = this._handleChangeURLInput.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this._handleSelectFeedGroup = this._handleSelectFeedGroup.bind(this);
        this._transitionToDisplayFeed = this._transitionToDisplayFeed.bind(this);
        this._transitionToDisplayForm = this._transitionToDisplayForm.bind(this);
    }

    componentWillReceiveProps(nextProps: IAddFeedModalProps){
        if(this.props.isAddingFeed && !nextProps.isAddingFeed){
            // The feed was added so reset the state 
            // and thus close the modal
            this._handleClose();
        }
    }

    _handleChangeURLInput(e: React.FormEvent<HTMLInputElement>){
        this.setState({
            feedURL: e.currentTarget.value
        });
    }

    _handleClickContinue(){
        const { feedURL } = this.state;

        if(feedURL !== ""){
            this.setState({
                isValidatingURL: true
            });

            this._serverValidateURL();
        }
    }

    _handleClose(){
        this.setState(INITIAL_STATE);

        this.props.onCloseModal();
    }

    _handleClickAddFeed(){
        const { feedInfo, feedGroupId, feedURL } = this.state;

        const dataToAdd = {
            title: feedInfo.title,
            description: feedInfo.description,
            link: feedInfo.link,
            feedgroup_id: feedGroupId,
            url: feedURL
        };
        this.props.beginAddFeed(dataToAdd);
    }

    _handleSelectFeedGroup(feedGroupId: TFeedgroupID){
        this.setState({
            feedGroupId
        })
    }

    _transitionToDisplayForm(){
        this.setState({
            display: DISPLAY_FORM,
            feedInfo: {},
            feedGroupId: "0",
            isValidatingURL: false
        })
    }

    _transitionToDisplayFeed(feedObj: IFeed){
        this.setState({
            display: DISPLAY_FEED,
            feedInfo: feedObj,
            formError: ""
        });
    }

    _serverValidateURL(){
        const { feedURL } = this.state;

        const url = API_FEEDVALIDATION_BASE;
        const init = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({feedURL})
        };
        
        fetch(url, init)
            .then((res)=>{
                return res.json();
            })
            .then((resObj)=>{
                if(resObj.status === "error"){
                    throw new Error("The feed address does not seem to be valid. Try again.");
                } else if(resObj.status === "success"){
                    return resObj;
                }
            })
            .then((resObj)=>{
                this._transitionToDisplayFeed(resObj.feedInfo.feed);
            })
            .catch((err)=>{
                this.setState({
                    formError: err.message,
                    feedInfo: {},
                    feedGroupId: "0",
                    isValidatingURL: false
                });
            })
    }

    _buildURLForm(){
        const { formError } = this.state;
        let message = null;
        if(formError !== ""){
            message = <Message negative>
                        <Message.Header>{formError}</Message.Header>
                      </Message>
        }
        return (
            <Form>
                <Form.Field>
                    <label>Feed Address</label>
                    <input 
                        autoFocus
                        placeholder='http://feed.url.here'
                        onChange={this._handleChangeURLInput} />
                </Form.Field>
                {message}
            </Form>
        );
    }

    _buildURLDisplayButtons(){
        const { isValidatingURL } = this.state;
        return (
            <span>
                <Button color="green"
                    onClick={this._handleClickContinue}
                    inverted
                    loading={isValidatingURL}>
                    <Icon name="chevron right" />&nbsp;&nbsp;&nbsp;Continue
                </Button>
            </span>
        );
    }

    _buildFeedInfo(){
        const { feedInfo, feedURL } = this.state;

        const description = (feedInfo.description !== feedInfo.title && feedInfo.description !== "")
                                ? feedInfo.description 
                                : "No description provided.";
        return (
            <div>
                <Header as='h4' attached='top'>
                    {feedInfo.title}
                </Header>
                <Header as='h5' attached>
                    {feedURL}
                </Header>
                <Segment attached="bottom">{description}</Segment>

                <Header as='h5' attached='top'>
                    Select Feed Group
                </Header>
                <Segment attached="bottom">
                    <SelectFeedGroup onChange={this._handleSelectFeedGroup} />
                </Segment>
            </div>
        );
    }

    _buildFeedInfoButtons(){
        const { isAddingFeed } = this.props;
        return (
            <span>
                <Button color="blue"
                    onClick={this._transitionToDisplayForm}
                    inverted>
                    <Icon name="chevron left" />&nbsp;&nbsp;&nbsp;Back
                </Button>
                <Button color="green"
                    onClick={this._handleClickAddFeed}
                    inverted
                    loading={isAddingFeed}>
                    <Icon name="checkmark" />&nbsp;&nbsp;&nbsp;This Is It!
                </Button>
            </span>
        );
    }

    render(){
        const {
            display
        } = this.state;

        const {
            isModalOpen
        } = this.props;

        let content = null;
        let buttons = null;
        if(display === DISPLAY_FORM){
            content = this._buildURLForm();
            buttons = this._buildURLDisplayButtons();
        } else if (display === DISPLAY_FEED){
            content = this._buildFeedInfo();
            buttons = this._buildFeedInfoButtons();
        }

        return (
            <Modal
                open={isModalOpen}
                onClose={this._handleClose}
                size="small"
            >
                <Header icon="plus" content="Add Feed" />
                <Modal.Content>
                    {content}
                </Modal.Content>
                <Modal.Actions>
                    <Button color="orange" onClick={this._handleClose} inverted>
                        <Icon name="close" /> Cancel
                    </Button>
                    {buttons}
                </Modal.Actions>
            </Modal>
        );
    }
}

const mapStateToProps = (state: IRootStoreState): IMapStateToProps=>{
    const { feeds } = state;
    return {
        isAddingFeed: feeds.isAddingFeed
    }
}

const mapDispatchToProps = (dispatch: IDispatch): IMapDispatchToProps=>{
    return {
        beginAddFeed: (feedInfo)=>dispatch(beginAddFeed(feedInfo))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddFeedModal);