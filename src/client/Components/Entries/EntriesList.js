import { List } from "immutable";
import React, { Component } from "react";
import { connect } from "react-redux";

import { Button, Menu } from "semantic-ui-react";

import EntryItem from "./EntryItem";
import SettingsModal from "./SettingsModal";
import SortMenu from "./SortMenu";

import { beginGetEntries, updateReadState } from "../../redux/actions/entries.actions";

class EntriesList extends Component {
    constructor(props){
        super(props);

        this.state = {
            sortBy: "publish_date:asc",
            activeEntryId: "",
            currentTitle: "",
            processedEntries: List()
        };

        // Setup the global/document level keypress events
        document.onkeydown = this._handleKeyDown.bind(this);

        this._handleChangeSort = this._handleChangeSort.bind(this);
        this._handleClickRefresh = this._handleClickRefresh.bind(this);
        this._toggleEntry = this._toggleEntry.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this._filterAndSortEntries(nextProps, this.state.sortBy);
    }

    _filterAndSortEntries(props, sortBy){
        const { entries, groups, feeds, filter } = props;

        let filteredEntries = entries;
        let title = "All";

        switch(filter.limit){
            case "feed":
                filteredEntries = entries.filter((entry)=>{
                    return entry.feed_id === filter.id
                })

                const activeFeed = feeds.get(filter.id);

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

                const activeGroup = groups.get(filter.id);                

                title = activeGroup.name;
                break;
        }

        const processedEntries = this._sortEntries(filteredEntries, sortBy);
        
        this.setState({
            currentTitle: title,
            processedEntries
        });
    }

    _sortEntries(entries, sortBy){
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

    _handleChangeSort(e, obj){
        this.setState({
            sortBy: obj.value
        });

        this._filterAndSortEntries(this.props, obj.value);
    }

    _handleClickRefresh(){
        this.props.getEntries();
    }

    _handleKeyDown(e){
        switch(e.key){
            case "ArrowDown":
            case "j":
                e.preventDefault();
                this._activateSiblingEntry("next");
                break;
            case "ArrowUp":
            case "k":
                e.preventDefault();
                this._activateSiblingEntry("previous");
                break;
        }
    }

    _activateSiblingEntry(direction){
        const { activeEntryId, processedEntries } = this.state;

        let sibling = {};

        if(activeEntryId === ""){
            sibling = processedEntries.first();
        } else {
            let previousEntry = {};
            let nextEntry = {};
            let found = false;
            processedEntries.map((entry, entryId)=>{
                if(found && !nextEntry.hasOwnProperty("_id")){
                    nextEntry = entry;
                }

                if(entryId === activeEntryId){
                    found = true;
                }

                if(!found){
                    previousEntry = entry;
                }
                
            });

            if(direction === "next"){
                if(nextEntry.hasOwnProperty("_id")){
                    sibling = nextEntry;
                } else {
                    sibling = processedEntries.last();
                }
            } else if(direction === "previous"){
                if(previousEntry.hasOwnProperty("_id")){
                    sibling = previousEntry;
                } else {
                    sibling = processedEntries.first();
                }
            }
        }

        this._markRead(sibling._id);

        this.setState({
            activeEntryId: sibling._id
        });
    }

    _toggleEntry(entryId){
        let nextActiveEntryId = entryId;
        if(this.state.activeEntryId === entryId){
            nextActiveEntryId = "";
        }

        this._markRead(nextActiveEntryId);

        this.setState({
            activeEntryId: nextActiveEntryId
        });
    }

    _markRead(entryId){
        const { entries, markEntryRead } = this.props;

        markEntryRead(entries.get(entryId));
    }

    render() {
        const { activeEntryId, currentTitle, processedEntries, sortBy } = this.state;

        let entryList = [];
        processedEntries.map((entry)=>{
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
                    <div className="rss-entrylist-menu-title-container">{currentTitle}</div>
                    <div className="rss-entrylist-menu-sortselect-container">
                        <Button
                            icon="refresh"
                            onClick={this._handleClickRefresh}
                        />
                        <SortMenu onChange={this._handleChangeSort} currentSortBy={sortBy}/>
                        <SettingsModal />
                    </div>
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
    return {
        markEntryRead: (entry)=>dispatch(updateReadState(entry, true)),
        getEntries: ()=>dispatch(beginGetEntries())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EntriesList);