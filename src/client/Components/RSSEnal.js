import React, { Component } from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";

import AddFeed from "./Modals/AddFeed";
import ListFeedGroups from "./ListFeedGroups";

class RSSEnal extends Component {
    render(){
        return (
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Menu attached="top">
                            <AddFeed />                            
                        </Menu>
                        <Segment attached="bottom">
                            <ListFeedGroups />
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