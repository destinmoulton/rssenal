import { Map, OrderedMap } from "immutable";
import * as fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as EntriesActions from "../entries.actions";
import * as ACT_TYPES from "../../actiontypes";
import * as INIT_STATE from "../../initialstate";

import API_ENTRIES_STRING from "../../../../../test/data/api/entries.unread";
import AMMENDED_ENTRIES from "../../../../../test/data/immutable/ammendedEntries";
import IMM_FEEDS from "../../../../../test/data/immutable/feeds";
import * as IMM_UNREAD from "../../../../../test/data/immutable/unreadMap";

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
            {
                type: ACT_TYPES.FEEDS_SET_UNREAD,
                unreadMap: IMM_UNREAD.UNREAD_MAP
            }
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

    it("entryUpdateHasRead() marks an entry read", () => {
        const entryID = "5b33c76cb2438d5708dc1983";
        const url = "/api/entries/" + entryID;
        fetchMock.putOnce(url, { body: { status: "success" } });

        const entry = AMMENDED_ENTRIES.get(entryID);

        const store = mockStore({
            entriesStore: {
                ...INIT_STATE.ENTRIES_INITIAL_STATE,
                entries: AMMENDED_ENTRIES
            },
            feedsStore: {
                ...INIT_STATE.FEEDS_INITIAL_STATE,
                unreadMap: IMM_UNREAD.UNREAD_MAP,
                feeds: IMM_FEEDS
            },
            filterStore: {
                ...INIT_STATE.FILTER_INITIAL_STATE,
                filteredEntries: AMMENDED_ENTRIES
            },
            settingsStore: INIT_STATE.SETTINGS_INITIAL_STATE
        });

        const newEntry = { ...entry, has_read: true };
        const expectedEntries = AMMENDED_ENTRIES.set(entryID, newEntry);
        const expectedUnreadMap = {
            ...IMM_UNREAD.UNREAD_MAP,
            feeds: IMM_UNREAD.UNREAD_MAP.feeds.set(
                IMM_UNREAD.UNREAD_MAP_FEED_ID,
                IMM_UNREAD.UNREAD_MAP_COUNT - 1
            ),
            folders: IMM_UNREAD.UNREAD_MAP.folders.set(
                IMM_UNREAD.UNREAD_MAP_FOLDER_ID,
                IMM_UNREAD.UNREAD_MAP_COUNT - 1
            )
        };

        const expectedActions = [
            { type: ACT_TYPES.FEEDS_SET_UNREAD, unreadMap: expectedUnreadMap },
            { type: ACT_TYPES.ENTRIES_SET_ALL, entries: expectedEntries },

            {
                type: ACT_TYPES.FILTER_CHANGE,
                filterTitle: "All",
                newFilter: { id: "all", limit: "folder" },
                filteredEntries: expectedEntries
            }
        ];

        return store
            .dispatch(EntriesActions.entryUpdateHasRead(entry, true))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("entriesClearAll() clears the current entries", () => {
        const store = mockStore({
            entriesStore: INIT_STATE.ENTRIES_INITIAL_STATE,
            feedsStore: {
                ...INIT_STATE.FEEDS_INITIAL_STATE,
                feeds: IMM_FEEDS
            },
            filterStore: INIT_STATE.FILTER_INITIAL_STATE,
            settingsStore: INIT_STATE.SETTINGS_INITIAL_STATE
        });

        const expectedActions = [
            { type: ACT_TYPES.ENTRIES_SET_ALL, entries: OrderedMap() },
            {
                type: ACT_TYPES.FILTER_CHANGE,
                filterTitle: "All",
                newFilter: { id: "all", limit: "folder" },
                filteredEntries: OrderedMap()
            }
        ];

        store.dispatch(EntriesActions.entriesClearAll());
        expect(store.getActions()).toEqual(expectedActions);
    });
});
