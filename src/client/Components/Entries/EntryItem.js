import PropTypes from "prop-types";
import React, { Component } from 'react';

class EntryItem extends Component {
    static propTypes = {
        toggleEntry: PropTypes.func.isRequired,
        isActive: PropTypes.bool.isRequired
    };

    _toggleEntry(entryId){
        const { toggleEntry } = this.props;

        toggleEntry(entryId);
    }

    _getBodyHTML(){
        const { entry } = this.props;

        return {__html: entry.content};
    }

    render() {
        const { entry, isActive } = this.props;

        let body = "";
        if(isActive){
            body = <div dangerouslySetInnerHTML={this._getBodyHTML()}></div>
        }
        return (
            <div 
                key={entry._id}
                className="rss-entry-container">
                <div
                    className="rss-entry-title" 
                    onClick={this._toggleEntry.bind(this, entry._id)}>{entry.title}</div>
                {body}
            </div>
        );
    }
}

export default EntryItem;