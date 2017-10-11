import React, { Component } from "react";
import { connect } from "react-redux";

import { Menu } from "semantic-ui-react";

import EntryItem from "./EntryItem";
import SortMenu from "./SortMenu";

class EntriesList extends Component {
    constructor(props){
        super(props);

        this.state = {
            sortBy: "publish_date:asc",
            activeEntryId: ""
        };

        this._handleChangeSort = this._handleChangeSort.bind(this);
        this._toggleEntry = this._toggleEntry.bind(this);
    }

    _toggleEntry(entryId){
        let nextActiveEntryId = entryId;
        if(this.state.activeEntryId === entryId){
            nextActiveEntryId = "";
        }
        this.setState({
            activeEntryId: nextActiveEntryId
        });
    }

    _handleChangeSort(e, obj){
        this.setState({
            sortBy: obj.value
        });
    }

    _sortEntries(entries){
        const { sortBy } = this.state;
        const sortParams = sortBy.split(":");
        return entries.sort((a,b)=>this._compareEntries(a, b, sortParams[0], sortParams[1]));
    }

    _compareEntries(a, b, field, order){
        if(order === "asc"){
            if(a[field] < b[field]){ return -1; }
            if(a[field] > b[field]){ return 1; }
        } else if(order === "desc"){
            if(a[field] > b[field]){ return -1; }
            if(a[field] < b[field]){ return 1; }
        }
        if(a[field] === b[field]){ return 0;}
    }

    _filterEntriesAndTitle(){
        const { entries, groups, feeds, filter } = this.props;

        let filteredEntries = entries;
        let title = "All";

        switch(filter.limit){
            case "feed":
                filteredEntries = entries.filter((entry)=>{
                    return entry.feed_id === filter.id
                })

                const activeFeed = feeds.find((feed)=>{
                    return feed._id === filter.id;
                });

                title = activeFeed.title;
                break;
            case "group":
                const feedIds = feeds.filter((feed)=>{
                    return feed.feedgroup_id === filter.id;
                }).map((feed)=>{
                    return feed._id;
                });

                filteredEntries = entries.filter((entry)=>{
                    return feedIds.includes(entry.feed_id);
                })

                const activeGroup = groups.find((group)=>{
                    return group._id === filter.id;
                });

                title = activeGroup.name;
                break;
        }
        return {
            title,
            entries: this._sortEntries(filteredEntries)
        }
    }

    render() {
        const { activeEntryId, sortBy } = this.state;

        const { title, entries } = this._filterEntriesAndTitle();
        
        let entryList = [];
        entries.map((entry)=>{
            const el =  <EntryItem 
                            key={entry._id}
                            entry={entry}
                            toggleEntry={this._toggleEntry}
                            isActive={(entry._id === activeEntryId)}/>;

            entryList.push(el);
        })
        return (
            <div>
                <div className="rss-entrylist-menu">
                    <div className="rss-entrylist-menu-title-container">{title}</div>
                    <div className="rss-entrylist-menu-sortselect-container"><SortMenu onChange={this._handleChangeSort} currentSortBy={sortBy}/></div>
                </div>
                <div className="rss-entrylist-container">
                    {entryList}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    const { entries, feedgroups, feeds, filter } = state;
    return {
        entries: entries.entries,
        groups: feedgroups.groups,
        feeds: feeds.feeds,
        filter: filter.filter
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(EntriesList);