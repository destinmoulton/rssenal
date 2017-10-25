import React, { Component } from 'react';

class ReorderGroupItem extends Component {
    render() {
        return (
            <div {...this.props}>
                {this.props.children}
            </div>
        );
    }
}

export default ReorderGroupItem;