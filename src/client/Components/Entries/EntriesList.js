import React, { Component } from "react";
import { connect } from "react-redux";

import EntryItem from "./EntryItem";

class EntriesList extends Component {
    constructor(props){
        super(props);

        this.state = {
            activeEntryId: ""
        };

        this._activateEntry = this._activateEntry.bind(this);
    }

    _activateEntry(entryId){
        this.setState({
            activeEntryId: entryId
        });
    }

    _filterEntries(){
        const { entries, feeds, filter } = this.props;

        switch(filter.limit){
            case "all":
                return entries;
            case "feed":
                return entries.filter((entry)=>{
                    return entry.feed_id === filter.id
                })
            case "group":
                const feedIds = feeds.filter((feed)=>{
                    return feed.feedgroup_id === filter.id;
                }).map((feed)=>{
                    return feed._id;
                });
                return entries.filter((entry)=>{
                    return feedIds.includes(entry.feed_id);
                })
            default: 
                return entries;
        }
    }

    render() {
        const { activeEntryId } = this.state;

        const entriesToDisplay = this._filterEntries();
        
        let entryList = [];
        entriesToDisplay.map((entry)=>{
            const el =  <EntryItem 
                            entry={entry}
                            activateEntry={this._activateEntry}
                            isActive={(entry._id === activeEntryId)}/>;

            entryList.push(el);
        })
        return (
            <div>
                {entryList}
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    const { entries, feeds, filter } = state;
    return {
        entries: entries.entries,
        feeds: feeds.feeds,
        filter: filter.filter
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(EntriesList);