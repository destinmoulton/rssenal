import PropTypes from "prop-types";
import React, { Component } from 'react';

class EntryItem extends Component {
    static propTypes = {
        activateEntry: PropTypes.func.isRequired,
        isActive: PropTypes.bool.isRequired
    };

    _activateEntry(entryId){
        const { activateEntry } = this.props;

        activateEntry(entryId);
    }

    render() {
        const { entry, isActive } = this.props;

        let body = "";
        if(isActive){
            body = <div>{entry.content}</div>
        }
        return (
            <div 
                key={entry._id}
                className="rss-entry-container">
                <div onClick={this._activateEntry.bind(this, entry._id)}>{entry.title}</div>
                {body}
            </div>
        );
    }
}

export default EntryItem;