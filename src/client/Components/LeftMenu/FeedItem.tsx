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
            <span>
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
            </span>
        );
    }

    render() {
        const { feed, filter, unreadMapFeeds} = this.props;
        const { isOptionsVisible } = this.state;

        let className = "";
        if(filter.limit === "feed" && filter.id === feed._id){
            className = "rss-folders-feeditem-title-active"
        }

        let unreadEntriesCount = "";
        if(unreadMapFeeds.has(feed._id)){
            unreadEntriesCount = " [" + unreadMapFeeds.get(feed._id) + "]";
        }
        let title = <span onClick={this._handleClickTitle} className={className}>{feed.title}{unreadEntriesCount}</span>;

        let options: any = "";
        if(isOptionsVisible){
            options = this._buildOptions();
        }

        return (
            <div className="rss-folders-feeditem"
                 onMouseEnter={this._handleShowOptions}
                 onMouseLeave={this._handleHideOptions}>{title}&nbsp;{options}</div>
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