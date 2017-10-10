import PropTypes from "prop-types";
import React, { Component } from 'react';

import { Icon } from "semantic-ui-react";

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
        let link = "";
        if(isActive){
            body = <div 
                    dangerouslySetInnerHTML={this._getBodyHTML()}
                    className="rss-entry-content-container"></div>
            link =  <div
                        className="rss-entry-link-container">
                        <a
                            target="_blank"
                            href={entry.link}>
                            <Icon name="external square"/> Visit Website
                        </a>
                    </div>
        }
        return (
            <div 
                key={entry._id}
                className="rss-entry-container">
                <div
                    className="rss-entry-title" 
                    onClick={this._toggleEntry.bind(this, entry._id)}>{entry.title}</div>
                    {body}
                    {link}
            </div>
        );
    }
}

export default EntryItem;