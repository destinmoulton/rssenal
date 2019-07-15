import { connect } from "react-redux";

import { deleteFeed } from "../../redux/actions/feeds.actions";
import * as EntryActions from "../../redux/actions/entries.actions";
import * as FilterActions from "../../redux/actions/filter.actions";
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
        deleteFeed: (feedId: Types.TFeedID) => dispatch(deleteFeed(feedId)),
        entriesRemoveRead: () => dispatch(EntryActions.entriesRemoveRead()),
        filterChange: (newFilter: Types.IFilter) =>
            dispatch(FilterActions.filterChange(newFilter)),
        filterVisibleEntries: () =>
            dispatch(FilterActions.filterVisibleEntries())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeedItemComponent);
