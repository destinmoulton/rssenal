import * as fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as EntriesActions from "../entries.actions";
import * as ACT_TYPES from "../../actiontypes";
import * as INIT_STATE from "../../initialstate";

import API_ENTRIES_STRING from "../../../../../test/data/api/entries.unread";
import AMMENDED_ENTRIES from "../../../../../test/data/immutable/ammendedEntries";
import IMM_FEEDS from "../../../../../test/data/immutable/feeds";
import IMM_UNREAD_MAP from "../../../../../test/data/immutable/unreadMap";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("entries.actions", () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
        localStorage.clear();
    });

    it("entriesGetAllForFeed() fetches and ammends entries", () => {
        const feedID = "5b33c76cb2438d5708dc197e";
        const url = "/api/entries/?showEntriesHasRead=false&feedId=" + feedID;

        fetchMock.getOnce(url, JSON.parse(API_ENTRIES_STRING));

        const expectedActions = [
            { type: ACT_TYPES.ENTRIES_SET_ALL, entries: AMMENDED_ENTRIES },
            {
                type: ACT_TYPES.FILTER_CHANGE,
                filterTitle: "All",
                newFilter: { id: "all", limit: "folder" },
                filteredEntries: AMMENDED_ENTRIES
            },
            { type: ACT_TYPES.FEEDS_SET_UNREAD, unreadMap: IMM_UNREAD_MAP }
        ];

        const store = mockStore({
            entriesStore: INIT_STATE.ENTRIES_INITIAL_STATE,
            feedsStore: {
                ...INIT_STATE.FEEDS_INITIAL_STATE,
                feeds: IMM_FEEDS
            },
            filterStore: INIT_STATE.FILTER_INITIAL_STATE,
            settingsStore: INIT_STATE.SETTINGS_INITIAL_STATE
        });

        return store
            .dispatch(EntriesActions.entriesGetAllForFeed(feedID))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});
