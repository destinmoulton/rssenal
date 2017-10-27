import * as React from 'react';

import { Button, Icon } from "semantic-ui-react";

import ReorderGroupsModal from "../Modals/ReorderGroupsModal";

interface IButtonBarProps {
    openAddFeedModal: (newFeed: object)=>void;
    openEditGroupModal: (groupDefault: object)=>void;
}

class ButtonBar extends React.Component<IButtonBarProps> {
    _handleAddGroup(){
        this.props.openEditGroupModal({_id:"", name:""});
    }

    _handleAddFeed(){
        this.props.openAddFeedModal({_id:"", title:""});
    }

    render() {

        return (
            <div>
                <Button.Group>
                    <Button
                        color="grey"
                        content="Feed"
                        icon="plus"
                        onClick={this._handleAddFeed.bind(this)}
                        size="tiny"
                    />
                    <Button
                        color="olive"
                        content="Group"
                        icon="plus"
                        onClick={this._handleAddGroup.bind(this)}
                        size="tiny"
                    />
                </Button.Group>                
                <ReorderGroupsModal />
            </div>
        );
    }
}

export default ButtonBar;