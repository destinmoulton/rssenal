import React, { Component } from 'react';

import { Button, Header, Icon, Modal } from "semantic-ui-react";
class SettingsModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            isModalOpen: false
        };

        this._handleClickOpenModal = this._handleClickOpenModal.bind(this);
        this._handleClickCloseModal = this._handleClickCloseModal.bind(this);
    }

    _handleClickOpenModal(){
        this.setState({
            isModalOpen: true
        })
    }

    _handleClickCloseModal(){
        this.setState({
            isModalOpen: false
        })
    }

    render() {
        const { isModalOpen } = this.state;
        const content = "";
        return (
            <span>
                <Icon 
                    name="setting"
                    link={true}
                    size="large"
                    color="blue"
                    onClick={this._handleClickOpenModal}/>
                <Modal
                    open={isModalOpen}
                    onClose={this._handleClickCloseModal}
                    size="small"
                >
                    <Header icon="setting" content="Settings" />
                    <Modal.Content>
                        {content}
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="orange" onClick={this._handleClickCloseModal} inverted>
                            <Icon name="close" /> Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </span>
        );
    }
}

export default SettingsModal;