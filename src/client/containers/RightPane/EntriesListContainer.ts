import { connect } from "react-redux";
import { updateReadState } from "../../redux/actions/entries.actions";

import * as Types from "../../interfaces";

import EntriesListComponent, {
    IEntriesListMapDispatch,
    IEntriesListMapState
} from "../../components/RightPane/EntriesListComponent";

const mapStateToProps = (
    state: Types.IRootStoreState
): IEntriesListMapState => {
    const { entries, feeds, filter, settings } = state;

    return {
        entries: entries.entries,
        feeds: feeds.feeds,
        filter: filter.filter,
        settings: settings.settings
    };
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): IEntriesListMapDispatch => {
    return {
        markEntryRead: entry => dispatch(updateReadState(entry, true))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EntriesListComponent);
