import React, { Component } from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";

import AddFeedModal from "./AddFeed/AddFeedModal";
import AddGroup from "./ListFeedGroups/AddGroup";
import EntriesList from "./Entries/EntriesList";
import ListFeedGroups from "./ListFeedGroups/ListFeedGroups";

class RSSEnal extends Component {

    constructor(props){
        super(props);

        this.state = {
            entriesFilter: {}
        };

        this._handleChangeEntriesFilter = this._handleChangeEntriesFilter.bind(this);
    }

    _handleChangeEntriesFilter(newFilter){
        this.setState({
            entriesFilter: newFilter
        });
    }

    render(){
        const { entriesFilter } = this.state;

        return (
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Menu attached="top">
                            <AddFeedModal />
                        </Menu>
                        <Segment attached="bottom">
                            <ListFeedGroups onFilterChange={this._handleChangeEntriesFilter}/>
                            <AddGroup />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <EntriesList filter={entriesFilter} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    
}

export default RSSEnal;