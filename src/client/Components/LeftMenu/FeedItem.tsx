import { Map } from "immutable";
import * as React from "react";
import { connect } from "react-redux";

import { Icon } from "semantic-ui-react";

import { beginDeleteFeed } from "../../redux/actions/feeds.actions";
import { changeFilter } from "../../redux/actions/filter.actions";

import { IDispatch, TFeedID, IFeed, IFeedsUnreadMap, IFilter, IRootStoreState } from "../../interfaces";

interface IFeedItemProps {
    editFeed: (feed: IFeed)=>void;
    feed: IFeed;
    beginDeleteFeed: (feedId: TFeedID)=>void;
    changeFilter: (newFilter: object)=>void;
    filter: IFilter;
    unreadMapFeeds: Map<TFeedID, number>;
}

class FeedItem extends React.Component<IFeedItemProps> {
    state = {
        isOptionsVisible: false
    };

    constructor(props: IFeedItemProps){
        super(props);

        this._handleClickDelete = this._handleClickDelete.bind(this);
        this._handleClickEdit = this._handleClickEdit.bind(this);
        this._handleClickTitle = this._handleClickTitle.bind(this);
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
        const conf = confirm(`Are you sure you want to delete "${feed.title}"?`);
        if(conf){
            beginDeleteFeed(feed._id);
        }
    }

    _handleClickEdit(){
        this.props.editFeed(this.props.feed);
    }

    _handleClickTitle(){
        const { changeFilter, feed } = this.props;

        changeFilter({
            limit: "feed",
            id: feed._id
        });
    }

    _buildOptions(){
        return (
            <div className="rss-folders-feeditem-options">
                <Icon 
                    name="pencil"
                    color="green" 
                    onClick={this._handleClickEdit}
                />
                <Icon  
                    name="trash"
                    color="red"
                    onClick={this._handleClickDelete}
                />
            </div>
        );
    }

    render() {
        const { feed, filter, unreadMapFeeds} = this.props;
        const { isOptionsVisible } = this.state;
        
        let className = "rss-folders-feeditem";
        if(filter.limit === "feed" && filter.id === feed._id){
            className = "rss-folders-feeditem rss-folders-feeditem-active"
        }
        
        let title = <div
                        className="rss-folders-feeditem-title"
                        onClick={this._handleClickTitle} >{feed.title}</div>;
        
        let unreadEntriesCount = "";
        if(unreadMapFeeds.has(feed._id) && unreadMapFeeds.get(feed._id) > 0){
            unreadEntriesCount = " [" + unreadMapFeeds.get(feed._id) + "]";
        }
        let unread = <div className="rss-folders-feeditem-unread">{unreadEntriesCount}</div>;

        let options: any = "";
        if(isOptionsVisible){
            options = this._buildOptions();
        }

        return (
            <div className={className}
                 onMouseEnter={this._handleShowOptions}
                 onMouseLeave={this._handleHideOptions}>{title}{unread}{options}</div>
        );
    }
}
const mapStateToProps = (state: IRootStoreState)=>{
    const { feeds, filter } = state;
    return {
        unreadMapFeeds: feeds.unreadMap.feeds,
        filter: filter.filter
    }
};

const mapDispatchToProps = (dispatch: IDispatch)=>{
    return {
        beginDeleteFeed: (feedId: TFeedID)=>dispatch(beginDeleteFeed(feedId)),
        changeFilter: (newFilter: IFilter)=>dispatch(changeFilter(newFilter))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedItem);