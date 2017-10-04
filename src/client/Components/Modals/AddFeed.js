import React, { Component } from "react";

import { Button, Form, Icon, Header, Modal, Segment } from "semantic-ui-react";

import { API_FEEDVALIDATION_BASE } from "../../redux/apiendpoints.js";

const DISPLAY_FORM = "FORM";
const DISPLAY_FEED = "FEED";

class AddFeed extends Component {
    constructor(props){
        super(props);

        this.state = {
            display: DISPLAY_FORM,
            feedInfo: {},
            isValidatingURL: false,
            isModalOpen: false,
            feedURL: ""
        };

        this._handleOpen = this._handleOpen.bind(this);
        this._handleClickAddFeed = this._handleClickAddFeed.bind(this);
        this._handleClickContinue = this._handleClickContinue.bind(this);
        this._handleChangeURLInput = this._handleChangeURLInput.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this._transitionToDisplayFeed = this._transitionToDisplayFeed.bind(this);
        this._transitionToDisplayForm = this._transitionToDisplayForm.bind(this);
    }

    _handleChangeURLInput(e){
        this.setState({
            feedURL: e.target.value
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

    _handleOpen(){
        this.setState({
            isModalOpen: true
        });
    }

    _handleClose(){
        this.setState({
            isModalOpen: false
        });
    }

    _handleClickAddFeed(){
        console.log("Adding feed");
    }

    _transitionToDisplayForm(){
        this.setState({
            display: DISPLAY_FORM,
            feedInfo: {},
            isValidatingURL: false
        })
    }

    _transitionToDisplayFeed(feedObj){
        this.setState({
            display: DISPLAY_FEED,
            feedInfo: feedObj
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
            .then((resJson)=>{
                this._transitionToDisplayFeed(resJson.feedInfo.feed);
            })
    }

    _buildURLForm(){
        return (
            <Form>
                <Form.Field>
                    <label>Feed Address</label>
                    <input 
                        autoFocus
                        placeholder='http://feed.url.here'
                        onChange={this._handleChangeURLInput} />
                </Form.Field>
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
        const description = (feedInfo.description !== feedInfo.title)
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
                <Segment attached>{description}</Segment>
                <div></div>
            </div>
        );
    }

    _buildFeedInfoButtons(){
        const { isValidatingURL } = this.state;
        return (
            <span>
                <Button color="blue"
                    onClick={this._transitionToDisplayForm}
                    inverted>
                    <Icon name="chevron left" />&nbsp;&nbsp;&nbsp;Back
                </Button>
                <Button color="green"
                    onClick={this._handleClickAddFeed}
                    inverted>
                    <Icon name="checkmark" />&nbsp;&nbsp;&nbsp;This Is It!
                </Button>
            </span>
        );
    }

    _buildModal(){
        const {
            display,
            isModalOpen
        } = this.state;

        let content = "";
        let buttons = "";
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

    render(){
        const modal = this._buildModal();
        return (
            <div>
                <Button onClick={this._handleOpen}>
                    <Icon name="plus square" /> Add Feed
                </Button>
                {modal}
            </div>
        );
    }
}

export default AddFeed;