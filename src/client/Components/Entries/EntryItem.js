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
                <div onClick={this._activateEntry.bind(this, entry._id)}>{entry.title}</div>
                {body}
            </div>
        );
    }
}

export default EntryItem;