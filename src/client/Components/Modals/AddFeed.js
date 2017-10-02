import React, { Component } from "react";

import { Button, Form, Icon, Header, Modal } from "semantic-ui-react";

class AddFeed extends Component {
    constructor(props){
        super(props);

        this.state = {
            isValidatingURL: false,
            isModalOpen: false,
            feedURL: ""
        };

        this._handleOpen = this._handleOpen.bind(this);
        this._handleClickContinue = this._handleClickContinue.bind(this);
        this._handleChangeURLInput = this._handleChangeURLInput.bind(this);
        this._handleClose = this._handleClose.bind(this);
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

    _serverValidateURL(){
        const { feedURL } = this.state;

        const init = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({feedURL})
        };
        const url = '/api/validatefeedurl/';
        fetch(url, init)
            .then((res)=>{
                return res.json();
            })
            .then((resJson)=>{
                console.log(resJson);
            })
    }

    render(){
        const { isModalOpen, isValidatingURL } = this.state;
        return (
            <div>
                <Button onClick={this._handleOpen}>
                    <Icon name="plus square" /> Add Feed
                </Button>
                <Modal
                    open={isModalOpen}
                    onClose={this._handleClose}
                    size="small"
                    >
                    <Header icon="plus" content="Add Feed" />
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Feed Address</label>
                                <input placeholder='http://feed.url.here' onChange={this._handleChangeURLInput}/>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="orange" onClick={this._handleClose} inverted>
                            <Icon name="close" /> Cancel
                        </Button>
                        <Button color="green" 
                                onClick={this._handleClickContinue}
                                inverted
                                loading={isValidatingURL}>
                            <Icon name="chevron right" />&nbsp;&nbsp;&nbsp;Continue
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default AddFeed;