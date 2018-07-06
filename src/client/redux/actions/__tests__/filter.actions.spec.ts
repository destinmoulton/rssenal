import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as FilterActions from "../filter.actions";
import * as INIT_STATE from "../../initialstate";

import IMM_ENTRIES from "../../../../../test/data/immutable/ammendedEntries";
import IMM_FEEDS from "../../../../../test/data/immutable/feeds";
import IMM_FOLDERS from "../../../../../test/data/immutable/folders";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("filter.actions", () => {
    it("filterVisibleEntries() handles filtering the visible entries", () => {
        const store = mockStore({
            entriesStore: {
                ...INIT_STATE.ENTRIES_INITIAL_STATE,
                entries: IMM_ENTRIES
            },
            feedsStore: {
                ...INIT_STATE.FEEDS_INITIAL_STATE,
                feeds: IMM_FEEDS
            },
            filterStore: INIT_STATE.FILTER_INITIAL_STATE,
            foldersStore: {
                ...INIT_STATE.FOLDERS_INITIAL_STATE,
                folders: IMM_FOLDERS
            }
        });

        store.dispatch(FilterActions.filterVisibleEntries());
        expect(store.getActions()).toMatchSnapshot();
    });

    it("filterChange() handles changing the filter", () => {
        const store = mockStore({
            filterStore: INIT_STATE.FILTER_INITIAL_STATE
        });

        const newFilter = {
            id: "FILTER_ID",
            limit: "LIMIT"
        };

        store.dispatch(FilterActions.filterChange(newFilter));
        expect(store.getActions()).toMatchSnapshot();
    });

    it("filterReset() handles resetting the filter", () => {
        const store = mockStore({
            filterStore: INIT_STATE.FILTER_INITIAL_STATE
        });

        store.dispatch(FilterActions.filterReset());
        expect(store.getActions()).toMatchSnapshot();
    });
});
