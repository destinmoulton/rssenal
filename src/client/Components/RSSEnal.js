import React, { Component } from "react";
import { Grid, Icon, Menu, Segment } from "semantic-ui-react";

class RSSEnal extends Component {
    render(){
        return (
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Menu attached="top">
                            <Icon name="plus square"
                                  color="blue"
                                  size="large"/>
                        </Menu>
                        <Segment attached="bottom">
                            Feeds here...
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