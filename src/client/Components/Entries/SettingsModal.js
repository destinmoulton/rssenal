import React, { Component } from "react";
import { connect } from "react-redux";

import { Button, Header, Icon, Modal, Radio } from "semantic-ui-react";

import { changeSetting } from "../../redux/actions/settings.actions";

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

    _buildSettings(){
        const { changeSetting, settings } = this.props;

        return settings.map((setting)=>{
            if(setting.type==="toggle"){
                return this._buildRadioToggle(setting);
            }
        });
    }

    _buildRadioToggle(setting){
        return (
            <div>
                <Radio 
                    key={setting.key}
                    checked={setting.value}
                    toggle
                    label={setting.name}
                    onChange={this._handleChangeSetting.bind(this, setting.key, !setting.value)}/>
            </div>
        );
    }

    _handleChangeSetting(setting_key, setting_value){
        this.props.changeSetting(setting_key, setting_value);
    }

    render() {
        const { isModalOpen } = this.state;
        const content = this._buildSettings();
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
                        <Button color="green" onClick={this._handleClickCloseModal} inverted>
                            <Icon name="checkmark" /> Done
                        </Button>
                    </Modal.Actions>
                </Modal>
            </span>
        );
    }
}

const mapStateToProps = (state)=>{
    const { settings } = state;
    return {
        settings: settings.settings
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        changeSetting: (setting_key, setting_value)=>dispatch(changeSetting(setting_key, setting_value))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);