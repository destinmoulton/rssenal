import React, { Component } from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";

import EntriesList from "./Entries/EntriesList";
import ListFeedGroups from "./ListFeedGroups/ListFeedGroups";

class RSSEnal extends Component {

    constructor(props){
        super(props);

        this.state = {
            entriesFilter: {},
            
        };

        this._handleChangeEntriesFilter = this._handleChangeEntriesFilter.bind(this);
        
    }

    _handleChangeEntriesFilter(newFilter){
        this.setState({
            entriesFilter: newFilter
        });
    }

    render(){
        const { 
            entriesFilter
        } = this.state;

        return (
            <div>
                <div className="rss-body-left-container">
                    <ListFeedGroups
                        onFilterChange={this._handleChangeEntriesFilter}
                    />
                </div>
                <div className="rss-body-right-container">
                    <EntriesList filter={entriesFilter} />
                </div>
            </div>
        )
    }
    
}

export default RSSEnal;