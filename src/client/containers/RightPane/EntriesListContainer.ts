import { connect } from "react-redux";
import { updateReadState } from "../../redux/actions/entries.actions";

import * as Types from "../../types";

import EntriesListComponent, {
    IEntriesListMapDispatch,
    IEntriesListMapState
} from "../../components/RightPane/EntriesListComponent";

const mapStateToProps = (
    state: Types.IRootStoreState
): IEntriesListMapState => {
    const { entriesStore, feedsStore, filterStore, settingsStore } = state;

    return {
        entries: entriesStore.entries,
        feeds: feedsStore.feeds,
        filter: filterStore.filter,
        filteredEntries: filterStore.filteredEntries,
        settings: settingsStore.settings
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
