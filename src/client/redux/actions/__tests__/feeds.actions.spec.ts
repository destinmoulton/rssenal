import * as fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as FeedsActions from "../feeds.actions";
import * as INIT_STATE from "../../initialstate";

import API_ENTRIES_STRING from "../../../../../test/data/api/entries.unread";
import API_FEEDS_STRING from "../../../../../test/data/api/feeds";
import FEED from "../../../../../test/data/feed";
import IMM_ENTRIES from "../../../../../test/data/immutable/ammendedEntries";
import IMM_FEEDS from "../../../../../test/data/immutable/feeds";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("feeds.actions", () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
        localStorage.clear();
    });

    it("feedAdd() handles adding a feed", async () => {
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

        try {
            await store.dispatch(FeedsActions.feedAdd(newFeed));
            expect(store.getActions()).toMatchSnapshot();

            await fetchMock.flush();
            expect(fetchMock.done()).toBe(true);
        } catch (err) {
            throw err;
        }
    });

    it("feedsGetAll() handles getting feeds", async () => {
        const feedID = "5b33c76cb2438d5708dc197e";

        const feed_url = "/api/feeds/";
        fetchMock.getOnce(feed_url, JSON.parse(API_FEEDS_STRING));

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

        try {
            await store.dispatch(FeedsActions.feedsGetAll());
            expect(store.getActions()).toMatchSnapshot();

            await fetchMock.flush();
            expect(fetchMock.done()).toBe(true);
        } catch (err) {
            throw err;
        }
    });

    it("feedsRefreshAll() handles refreshing entries for current feeds", async () => {
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

        try {
            store.dispatch(FeedsActions.feedsRefreshAll());
            expect(store.getActions()).toMatchSnapshot();

            await fetchMock.flush();
            expect(fetchMock.done()).toBe(true);
        } catch (err) {
            throw err;
        }
    });

    it("deleteFeed() handles deleting a feed", async () => {
        const feedID = "5b33c76cb2438d5708dc197e";
        const url = "/api/feeds/" + feedID;
        fetchMock.deleteOnce(url, { body: { status: "success" } });

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

        try {
            await store.dispatch(FeedsActions.deleteFeed(feedID));
            expect(store.getActions()).toMatchSnapshot();

            await fetchMock.flush();
            expect(fetchMock.done()).toBe(true);
        } catch (err) {
            throw err;
        }
    });

    it("saveFeed() handles saving feed", async () => {
        const feedID = "5b33c76cb2438d5708dc197e";
        const feeds_url = "/api/feeds/" + feedID;
        fetchMock.putOnce(feeds_url, { status: "success", feedInfo: FEED });

        const feed_url = "/api/feeds/";

        fetchMock.getOnce(feed_url, JSON.parse(API_FEEDS_STRING));

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

        const updatedFeed = {
            _id: feedID,
            title: "FEED_TITLE",
            folder_id: "FOLDER_ID",
            description: "DESCRIPTION",
            link: "LINK_HERE"
        };
        try {
            await store.dispatch(FeedsActions.saveFeed(updatedFeed));
            expect(store.getActions()).toMatchSnapshot();

            await fetchMock.flush();
            expect(fetchMock.done()).toBe(true);
        } catch (err) {
            throw err;
        }
    });

    it("feedsSetAll() handles setting the feeds", () => {
        const store = mockStore({
            feedsStore: {
                ...INIT_STATE.FEEDS_INITIAL_STATE
            }
        });
        store.dispatch(FeedsActions.feedsSetAll(IMM_FEEDS));
        expect(store.getActions()).toMatchSnapshot();
    });

    it("feedsUpdateUnreadCount() handles updating the unread count", () => {
        const store = mockStore({
            feedsStore: {
                ...INIT_STATE.FEEDS_INITIAL_STATE,
                feeds: IMM_FEEDS
            }
        });
        store.dispatch(FeedsActions.feedsUpdateUnreadCount(IMM_ENTRIES));
        expect(store.getActions()).toMatchSnapshot();
    });

    it("feedsDecrementUnread() handles decrementing the read count", () => {
        const feedID = "5b33c76cb2438d5708dc197e";
        const store = mockStore({
            feedsStore: {
                ...INIT_STATE.FEEDS_INITIAL_STATE,
                feeds: IMM_FEEDS
            }
        });
        store.dispatch(FeedsActions.feedsDecrementUnread(feedID));
        expect(store.getActions()).toMatchSnapshot();
    });
});
