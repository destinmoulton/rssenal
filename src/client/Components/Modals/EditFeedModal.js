import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import { Button, Header, Icon, Modal } from "semantic-ui-react";
import SelectFeedGroup from "./SelectFeedGroup";

import { beginUpdateFeed } from "../../redux/actions/feeds.actions";

class EditFeedModal extends Component {
    static propTypes = {
        isModalOpen: PropTypes.bool.isRequired,
        onCloseModal: PropTypes.func.isRequired,
        feed: PropTypes.object.isRequired
    }

    constructor(props){
        super(props);

        this.state = {
            newFeed: {}
        }
        
        this._handleClose = this._handleClose.bind(this);
        this._handleSave = this._handleSave.bind(this);
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleInputOnChange = this._handleInputOnChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.isUpdatingFeed && !nextProps.isUpdatingFeed){
            this._handleClose();
        }
        this.setState({
            newFeed: nextProps.feed
        });
    }
    
    _handleClose(){
        this.setState({
            newFeed: {}
        });

        this.props.onCloseModal();
    }

    _handleSave(){
        const { newFeed } = this.state;

        if(newFeed.name !== ""){
            this.props.beginSaveFeed(newFeed);
        }
    }

    _handleInputKeyPress(e){
        if(e.key === "Enter"){
            this._handleSave();
        }
    }

    _handleInputOnChange(e){
        const { newFeed } = this.state;
        newFeed.name = e.target.value;
        this.setState({
            newFeed
        });
    }

    _buildEditInput(){
        const { newFeed } = this.state;
        const { isUpdatingFeed } = this.props;

        return (
            <div>
                <input
                    autoFocus
                    value={newFeed.name}
                    placeholder="Feed name..."
                    onKeyPress={this._handleInputKeyPress}
                    onChange={this._handleInputOnChange}
                    disabled={isUpdatingFeed}
                />
                < SelectFeedGroup selectedValue={newFeed.feedgroup_id}/>
            </div>
        )
    }

    _buildButtons(){
        const { isUpdatingFeed } = this.props;

        let cancelButton = "";
        if(!isUpdatingFeed){
            cancelButton = <Button
                                color="orange"
                                content="Cancel"
                                floated="left"
                                icon="cancel"
                                inverted
                                onClick={this._handleClose}
                                size="mini"
                            />;
        }

        return (
            <div>
                {cancelButton}
                <Button 
                    color="green"
                    content="Save"
                    icon="save"
                    floated="right"
                    inverted
                    loading={isUpdatingFeed}
                    onClick={this._handleSave}
                    size="mini"
                />
            </div>
        );
    }

    render() {
        const { feed, isModalOpen } = this.props;
        const form = this._buildEditInput();

        const buttons = this._buildButtons();
        return (
            <span>
                <Modal
                    open={isModalOpen}
                    onClose={this._handleClickCloseModal}
                    size="tiny"
                >
                    <Header icon="pencil" content="Edit Feed" />
                    <Modal.Content>
                        {form}
                    </Modal.Content>
                    <Modal.Actions>
                        {buttons}
                    </Modal.Actions>
                </Modal>
            </span>
        );
    }
}
const mapStateToProps = (state)=>{
    const { feeds } = state;
    return {
        isUpdatingFeed: feeds.isUpdatingFeed
    };
}

const mapDispatchToProps = (dispatch)=>{
    return {
        beginUpdateFeed: (feedInfo)=> dispatch(beginUpdateFeed(feedInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditFeedModal);