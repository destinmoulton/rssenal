import { List, OrderedMap } from "immutable";
import * as fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as FeedsActions from "../feeds.actions";
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

    it("feedInitiateAdd() handles adding a feed", () => {
        const url = "/api/feeds";

        fetchMock.getOnce(url);

        let expectedMessages = List([
            { message: "Feed added.", level: "success", uid: 1 }
        ]);

        const expectedActions = [
            { type: ACT_TYPES.FEEDS_ADD_BEGIN },
            {
                type: ACT_TYPES.MESSAGES_ADD_COMPLETE,
                messages: expectedMessages,
                lastUID: 1
            },
            {
                type: ACT_TYPES.FEEDS_ADD_COMPLETE,
                feeds: IMM_FEEDS
            },
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
            feedsStore: INIT_STATE.FEEDS_INITIAL_STATE,
            filterStore: INIT_STATE.FILTER_INITIAL_STATE,
            settingsStore: INIT_STATE.SETTINGS_INITIAL_STATE
        });

        return store.dispatch(FeedsActions.feedsGetAll()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
