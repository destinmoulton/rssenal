import React, { Component } from "react";
import { connect } from "react-redux";

import { Button } from "semantic-ui-react";

import { beginDeleteFeed } from "../../redux/actions/feeds.actions";

class FeedItem extends Component {

    constructor(props){
        super(props);

        this.state = {
            isOptionsVisible: false
        }

        this._handleClickDelete = this._handleClickDelete.bind(this);
        this._handleHideOptions = this._handleHideOptions.bind(this);
        this._handleShowOptions = this._handleShowOptions.bind(this);
    }

    _handleShowOptions(){
        this.setState({
            isOptionsVisible: true
        });
    }

    _handleHideOptions(){
        this.setState({
            isOptionsVisible: false
        })
    }

    _handleClickDelete(){
        const { beginDeleteFeed, feed } = this.props;
        beginDeleteFeed(feed._id);
    }

    _buildOptions(){
        return (
            <Button 
                inverted
                icon="trash"
                onClick={this._handleClickDelete}>
            </Button>
        );
    }

    render() {
        const { feed } = this.props;
        const { isOptionsVisible } = this.state;

        let options = "";
        if(isOptionsVisible){
            options = this._buildOptions();
        }
        
        return (
            <div className="rss-feedgroups-feeditem"
                 onMouseEnter={this._handleShowOptions}
                 onMouseLeave={this._handleHideOptions}>{feed.title}&nbsp;{options}</div>
        );
    }
}
const mapStateToProps = (state)=>{
    return {

    }
};

const mapDispatchToProps = (dispatch)=>{
    return {
        beginDeleteFeed: (feedId)=>dispatch(beginDeleteFeed(feedId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedItem);