import * as React from "react";

import { Button, Header, Icon, Modal, Popup, Radio } from "semantic-ui-react";

import { ISetting, TSettings } from "../../interfaces";

export interface ISettingsModalMapDispatch {
    settingChange: (setting_key: string, setting_value: any) => void;
    refreshAllFeeds: () => void;
}

export interface ISettingsModalMapState {
    settings: TSettings;
}

type TAllProps = ISettingsModalMapState & ISettingsModalMapDispatch;

interface ISettingsModalState {
    isModalOpen: boolean;
}

class SettingsModalComponent extends React.Component<
    TAllProps,
    ISettingsModalState
> {
    state = {
        isModalOpen: false
    };

    componentDidUpdate() {
        console.log(this.props);
    }

    _handleClickOpenModal = () => {
        this.setState({
            isModalOpen: true
        });
    };

    _handleClickCloseModal = () => {
        this.setState({
            isModalOpen: false
        });
    };

    _buildSettings() {
        const { settings } = this.props;

        return settings
            .map((setting, key) => {
                if (setting.type === "toggle") {
                    return this._buildRadioToggle(key, setting);
                }
            })
            .toArray();
    }

    _buildRadioToggle(setting_key: string, setting: ISetting) {
        return (
            <div className="rss-settings-toggle-box" key={setting_key}>
                <Radio
                    checked={setting.value}
                    toggle
                    label={setting.name}
                    onChange={this._handleChangeSetting.bind(
                        this,
                        setting_key,
                        !setting.value,
                        setting
                    )}
                />
            </div>
        );
    }

    _handleChangeSetting(
        setting_key: string,
        setting_value: any,
        setting: ISetting
    ) {
        this.props.settingChange(setting_key, setting_value);

        if (setting.refresh_entries_on_change) {
            this.props.refreshAllFeeds();
        }
    }

    render() {
        const { isModalOpen } = this.state;
        const content = this._buildSettings();
        return (
            <span>
                <Popup
                    trigger={
                        <Icon
                            name="setting"
                            link={true}
                            size="large"
                            color="blue"
                            onClick={this._handleClickOpenModal}
                        />
                    }
                    content="Settings"
                />
                <Modal
                    open={isModalOpen}
                    onClose={this._handleClickCloseModal}
                    size="tiny"
                    className="rss-modal"
                >
                    <Header icon="setting" content="Settings" />
                    <Modal.Content>{content}</Modal.Content>
                    <Modal.Actions>
                        <Button
                            color="green"
                            onClick={this._handleClickCloseModal}
                            inverted
                        >
                            <Icon name="checkmark" /> Done
                        </Button>
                    </Modal.Actions>
                </Modal>
            </span>
        );
    }
}

export default SettingsModalComponent;
