import { connect } from "react-redux";
import { entriesGetAllForFeed } from "../../redux/actions/entries.actions";
import { beginDeleteFeed } from "../../redux/actions/feeds.actions";
import { filterChangeActive } from "../../redux/actions/filter.actions";
import FeedItemComponent, {
    IFeedItemMapState,
    IFeedItemMapDispatch
} from "../../components/LeftPane/FeedItemComponent";
import * as Types from "../../types";

const mapStateToProps = (state: Types.IRootStoreState): IFeedItemMapState => {
    const { feedsStore, filterStore } = state;
    return {
        filter: filterStore.filter,
        unreadMapFeeds: feedsStore.unreadMap.feeds
    };
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): IFeedItemMapDispatch => {
    return {
        beginDeleteFeed: (feedId: Types.TFeedID) =>
            dispatch(beginDeleteFeed(feedId)),
        filterChangeActive: (newFilter: Types.IFilter) =>
            dispatch(filterChangeActive(newFilter))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeedItemComponent);
