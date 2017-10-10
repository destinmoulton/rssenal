import { AllHtmlEntities } from "html-entities";
import moment from "moment";
import PropTypes from "prop-types";
import React, { Component } from 'react';
import { connect } from "react-redux";

import { Icon } from "semantic-ui-react";

const htmlEntities = new AllHtmlEntities();

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

    _getActiveEntryContent(){
        const { entry, feeds } = this.props;

        const activeFeed = feeds.find((feed)=>feed._id === entry.feed_id);
        const creator = (entry.creator !== undefined || entry.creator !== "") ? " by "+ entry.creator : "";
        const timeAgo = moment(entry.publish_date).fromNow()

        const info = <div>{activeFeed.title}{creator} -- {timeAgo}</div>;

        const body = <div 
                    dangerouslySetInnerHTML={this._getBodyHTML()}
                    className="rss-entry-content-container"></div>

        const link =  <div
                        className="rss-entry-link-container">
                        <a
                            target="_blank"
                            href={entry.link}>
                            <Icon name="external square"/> Visit Website
                        </a>
                    </div>
        
        return (
            <div>{info}{body}{link}</div>
        );
    }

    render() {
        const { entry, isActive } = this.props;

        let content = "";
        if(isActive){
            content = this._getActiveEntryContent();
        }

        const title = htmlEntities.decode(entry.title);
        return (
            <div 
                key={entry._id}
                className="rss-entry-container">
                <div
                    className="rss-entry-title" 
                    onClick={this._toggleEntry.bind(this, entry._id)}>{title}</div>
                    {content}
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    const { feeds } = state;
    return {
        feeds: feeds.feeds
    }
}
export default connect(mapStateToProps)(EntryItem);