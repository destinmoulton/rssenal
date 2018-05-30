import { connect } from "react-redux";
import { getEntriesForFeed } from "../../redux/actions/entries.actions";
import { beginDeleteFeed } from "../../redux/actions/feeds.actions";
import { changeFilter } from "../../redux/actions/filter.actions";
import FeedItemComponent, {
    IFeedItemComponentProps
} from "../../components/LeftMenu/FeedItemComponent";
import * as Types from "../../interfaces";

const mapStateToProps = (
    state: Types.IRootStoreState
): IFeedItemComponentProps => {
    const { feeds, filter } = state;
    return {
        unreadMapFeeds: feeds.unreadMap.feeds,
        filter: filter.filter
    };
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): IFeedItemComponentProps => {
    return {
        beginDeleteFeed: (feedId: Types.TFeedID) =>
            dispatch(beginDeleteFeed(feedId)),
        changeFilter: (newFilter: Types.IFilter) =>
            dispatch(changeFilter(newFilter))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedItemComponent);
