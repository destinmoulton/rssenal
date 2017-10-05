import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

class ListFeeds extends Component {
    static propTypes = {
        groupId: PropTypes.string.isRequired
    };

    render() {
        const { feeds, groupId } = this.props;

        const feedList = [];
        const groupFeeds = feeds.filter((feed)=>{
            return (feed.feedgroup_id === groupId);
        }).map((feed)=>{
            const item = <div key={feed._id} className="rss-feedgroups-feeditem">{feed.title}</div>;
            feedList.push(item)
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