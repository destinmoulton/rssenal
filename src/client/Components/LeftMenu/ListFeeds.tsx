import PropTypes from "prop-types";
import * as React from "react";
import { connect } from "react-redux";

import FeedItem from "./FeedItem";
class ListFeeds extends React.Component {
    static propTypes = {
        editFeed: PropTypes.func.isRequired,
        groupId: PropTypes.string.isRequired
    };

    render() {
        const {
            editFeed,
            feeds,
            groupId
        } = this.props;

        const feedList = [];
        const groupFeeds = feeds.filter((feed)=>{
            return (feed.feedgroup_id === groupId);
        }).map((feed)=>{
            const item = <FeedItem key={feed._id} feed={feed} editFeed={editFeed}/>;
            feedList.push(item);
        });
        
        return (
            <div>
                {feedList}
            </div>
        );
    }
}
const mapStateToProps = (state)=>{
    const { feeds } = state;

    return {
        feeds: feeds.feeds
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListFeeds);