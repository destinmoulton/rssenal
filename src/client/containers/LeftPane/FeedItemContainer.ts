import { connect } from "react-redux";
import { getEntriesForFeed } from "../../redux/actions/entries.actions";
import { beginDeleteFeed } from "../../redux/actions/feeds.actions";
import { changeFilter } from "../../redux/actions/filter.actions";
import FeedItemComponent, {
    IFeedItemMapState,
    IFeedItemMapDispatch
} from "../../components/LeftMenu/FeedItemComponent";
import * as Types from "../../interfaces";

const mapStateToProps = (state: Types.IRootStoreState): IFeedItemMapState => {
    const { feeds, filter } = state;
    return {
        filter: filter.filter,
        unreadMapFeeds: feeds.unreadMap.feeds
    };
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): IFeedItemMapDispatch => {
    return {
        beginDeleteFeed: (feedId: Types.TFeedID) =>
            dispatch(beginDeleteFeed(feedId)),
        changeFilter: (newFilter: Types.IFilter) =>
            dispatch(changeFilter(newFilter))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedItemComponent);
