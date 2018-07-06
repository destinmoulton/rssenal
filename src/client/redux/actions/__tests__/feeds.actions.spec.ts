import { List, OrderedMap } from "immutable";
import * as fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as FeedsActions from "../feeds.actions";
import * as ACT_TYPES from "../../actiontypes";
import * as INIT_STATE from "../../initialstate";

import API_ENTRIES_STRING from "../../../../../test/data/api/entries.unread";
import API_FEEDS_STRING from "../../../../../test/data/api/feeds";
import FEED from "../../../../../test/data/feed";
import AMMENDED_ENTRIES from "../../../../../test/data/immutable/ammendedEntries";
import IMM_FEEDS from "../../../../../test/data/immutable/feeds";
import * as IMM_UNREAD from "../../../../../test/data/immutable/unreadMap";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("feeds.actions", () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
        localStorage.clear();
    });

    it("feedAdd() handles adding a feed", () => {
        const feedID = "5b33c76cb2438d5708dc197e";
        const entries_url =
            "/api/entries/?showEntriesHasRead=false&feedId=" + feedID;

        fetchMock.getOnce(entries_url, JSON.parse(API_ENTRIES_STRING));

        const feed_url = "/api/feeds/";

        fetchMock.postOnce(feed_url, { status: "success", feedInfo: FEED });

        const store = mockStore({
            entriesStore: INIT_STATE.ENTRIES_INITIAL_STATE,
            feedsStore: {
                ...INIT_STATE.FEEDS_INITIAL_STATE,
                feeds: IMM_FEEDS
            },
            filterStore: INIT_STATE.FILTER_INITIAL_STATE,
            foldersStore: INIT_STATE.FOLDERS_INITIAL_STATE,
            messagesStore: INIT_STATE.MESSAGES_INITIAL_STATE,
            settingsStore: INIT_STATE.SETTINGS_INITIAL_STATE
        });

        const newFeed = {
            title: "NEW_FEED",
            folder_id: "FOLDER_ID",
            description: "DESCRIPTION",
            link: "LINK_HERE"
        };

        return store.dispatch(FeedsActions.feedAdd(newFeed)).then(() => {
            expect(store.getActions()).toMatchSnapshot();
        });
    });

    it("feedsGetAll() handles getting feeds", () => {
        const feedID = "5b33c76cb2438d5708dc197e";
        const entries_url =
            "/api/entries/?showEntriesHasRead=false&feedId=" + feedID;

        fetchMock.getOnce(entries_url, JSON.parse(API_ENTRIES_STRING));

        const feed_url = "/api/feeds/";

        fetchMock.getOnce(feed_url, JSON.parse(API_FEEDS_STRING));

        const store = mockStore({
            entriesStore: INIT_STATE.ENTRIES_INITIAL_STATE,
            feedsStore: {
                ...INIT_STATE.FEEDS_INITIAL_STATE,
                feeds: IMM_FEEDS
            },
            filterStore: INIT_STATE.FILTER_INITIAL_STATE,
            foldersStore: INIT_STATE.FOLDERS_INITIAL_STATE,
            messagesStore: INIT_STATE.MESSAGES_INITIAL_STATE,
            settingsStore: INIT_STATE.SETTINGS_INITIAL_STATE
        });

        return store.dispatch(FeedsActions.feedsGetAll()).then(() => {
            expect(store.getActions()).toMatchSnapshot();
        });
    });

    it("feedsRefreshAll() handles refreshing entries for current feeds", () => {
        const feedID = "5b33c76cb2438d5708dc197e";
        const entries_url =
            "/api/entries/?showEntriesHasRead=false&feedId=" + feedID;

        fetchMock.getOnce(entries_url, JSON.parse(API_ENTRIES_STRING));

        const store = mockStore({
            entriesStore: INIT_STATE.ENTRIES_INITIAL_STATE,
            feedsStore: {
                ...INIT_STATE.FEEDS_INITIAL_STATE,
                feeds: IMM_FEEDS
            },
            filterStore: INIT_STATE.FILTER_INITIAL_STATE,
            foldersStore: INIT_STATE.FOLDERS_INITIAL_STATE,
            messagesStore: INIT_STATE.MESSAGES_INITIAL_STATE,
            settingsStore: INIT_STATE.SETTINGS_INITIAL_STATE
        });

        store.dispatch(FeedsActions.feedsRefreshAll());
        expect(store.getActions()).toMatchSnapshot();
    });
});
