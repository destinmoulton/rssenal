import React, { Component } from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";

import AddFeedModal from "./AddFeed/AddFeedModal";
import AddGroup from "./ListFeedGroups/AddGroup";
import ListFeedGroups from "./ListFeedGroups/ListFeedGroups";

class RSSEnal extends Component {
    render(){
        return (
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Menu attached="top">
                            <AddFeedModal />
                        </Menu>
                        <Segment attached="bottom">
                            <ListFeedGroups />
                            <AddGroup />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        Content here...
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    
}

export default RSSEnal;