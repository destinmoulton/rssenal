import React, { Component } from "react";
import { connect } from "react-redux";

class EntriesList extends Component {
    constructor(props){
        super(props);
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
        const entriesToDisplay = this._filterEntries();
        
        let entryList = [];
        entriesToDisplay.map((entry)=>{
            const el =  <div key={entry._id}>
                            {entry.title}
                        </div>;

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