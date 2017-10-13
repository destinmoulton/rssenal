import PropTypes from "prop-types";
import React, { Component } from 'react';

import { Button, Icon } from "semantic-ui-react";

class ButtonBar extends Component {
    static propTypes = {
        openEditGroupModal: PropTypes.func.isRequired
    }

    _handleAddGroup(){
        this.props.openEditGroupModal({_id:"", name:""})
    }

    render() {

        return (
            <div>
                <Button.Group>
                    <Button onClick={this._handleAddGroup.bind(this)}>
                        <Icon name="plus square" /> Add Group
                    </Button>
                </Button.Group>                
            </div>
        );
    }
}

export default ButtonBar;