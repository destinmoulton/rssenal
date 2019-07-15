import * as fetchMock from "fetch-mock";

import { Map, Set, OrderedMap } from "immutable";

import * as FeedsServices from "../feeds.services";

import FEED from "../../../../../test/data/feed";
import API_FEEDS_STRING from "../../../../../test/data/api/feeds";
import IMM_FEEDS from "../../../../../test/data/immutable/feeds";
import IMM_ENTRIES from "../../../../../test/data/immutable/ammendedEntries";

describe("feeds.services", () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
        localStorage.clear();
    });

    describe("apiAddFeed()", () => {
        it("throws an error for an error response", async () => {
            const url = "/api/feeds/";
            fetchMock.postOnce(url, { body: { status: "error" } });

            expect.assertions(2);

            try {
                await FeedsServices.apiAddFeed(FEED);
            } catch (err) {
                expect(err).toBeInstanceOf(Error);

                await fetchMock.flush();
                expect(fetchMock.done()).toBe(true);
            }
        });

        it("returns the new feed for a valid response", async () => {
            const expectedFeed = { feedData: "FEED DATA HERE" };
            const URL = "/api/feeds/";
            fetchMock.postOnce(URL, {
                body: {
                    status: "success",
                    feedInfo: expectedFeed
                }
            });

            expect.assertions(2);

            try {
                const feedInfo = await FeedsServices.apiAddFeed(FEED);
                expect(feedInfo).toEqual(expectedFeed);

                await fetchMock.flush();
                expect(fetchMock.done()).toBe(true);
            } catch (err) {
                throw err;
            }
        });
    });

    describe("apiDeleteFeed()", () => {
        it("throws an error for an error response", async () => {
            const url = "/api/feeds/FEED_ID";
            fetchMock.deleteOnce(url, { body: { status: "error" } });

            expect.assertions(2);

            try {
                await FeedsServices.apiDeleteFeed("FEED_ID");
            } catch (err) {
                expect(err).toBeInstanceOf(Error);
                expect(fetchMock.done()).toBe(true);
            }
        });

        it("returns the new feed for a valid response", async () => {
            const expectedFeed = { feedData: "FEED DATA HERE" };
            const url = "/api/feeds/FEED_ID";
            fetchMock.deleteOnce(url, {
                body: {
                    status: "success"
                }
            });

            expect.assertions(2);

            try {
                const res = await FeedsServices.apiDeleteFeed("FEED_ID");
                expect(res).toBe(true);

                await fetchMock.flush();
                expect(fetchMock.done()).toBe(true);
            } catch (err) {
                throw err;
            }
        });
    });

    describe("apiGetAllFeeds()", () => {
        it("throws an error for an error response", async () => {
            const url = "/api/feeds/";
            fetchMock.getOnce(url, { status: "error" });

            expect.assertions(2);

            try {
                await FeedsServices.apiGetAllFeeds();
            } catch (err) {
                expect(err).toBeInstanceOf(Error);
                expect(fetchMock.done()).toBe(true);
            }
        });

        it("returns the feeds for a valid response", async () => {
            const expectedFeeds = ["feed1", "feed2"];
            const url = "/api/feeds/";
            fetchMock.getOnce(url, {
                status: "success",
                feeds: expectedFeeds
            });

            expect.assertions(2);

            try {
                const res = await FeedsServices.apiGetAllFeeds();
                expect(res).toEqual(expectedFeeds);

                await fetchMock.flush();
                expect(fetchMock.done()).toBe(true);
            } catch (err) {
                throw err;
            }
        });
    });

    describe("apiUpdateFeed()", () => {
        it("throws an error for an error response", async () => {
            const feedID = "5b33c76cb2438d5708dc197e";
            const url = "/api/feeds/" + feedID;
            fetchMock.putOnce(url, { body: { status: "error" } });

            expect.assertions(2);

            try {
                await FeedsServices.apiUpdateFeed(FEED);
            } catch (err) {
                expect(err).toBeInstanceOf(Error);
                expect(fetchMock.done()).toBe(true);
            }
        });

        it("returns the updated feed for a valid response", async () => {
            const expectedFeed = { feed: "UPDATED FEED" };
            const feedID = "5b33c76cb2438d5708dc197e";
            const url = "/api/feeds/" + feedID;
            fetchMock.putOnce(url, {
                body: {
                    status: "success",
                    feedInfo: expectedFeed
                }
            });

            expect.assertions(2);

            try {
                const res = await FeedsServices.apiUpdateFeed(FEED);
                expect(res).toEqual(expectedFeed);

                await fetchMock.flush();
                expect(fetchMock.done()).toBe(true);
            } catch (err) {
                throw err;
            }
        });
    });

    describe("apiValidateFeedURL()", () => {
        it("throws an error for an error response", async () => {
            const url = "/api/validatefeedurl/";
            fetchMock.postOnce(url, { body: { status: "error" } });

            expect.assertions(2);

            try {
                await FeedsServices.apiValidateFeedURL("TESTURL");
            } catch (err) {
                expect(err).toBeInstanceOf(Error);

                await fetchMock.flush();
                expect(fetchMock.done()).toBe(true);
            }
        });

        it("returns the validated feed for a valid response", async () => {
            const expectedFeed = { feedData: "FEED DATA HERE" };
            const url = "/api/validatefeedurl/";
            fetchMock.postOnce(url, {
                body: {
                    status: "success",
                    feedInfo: expectedFeed
                }
            });

            expect.assertions(2);

            try {
                const feedInfo = await FeedsServices.apiValidateFeedURL(
                    "TESTURL"
                );
                expect(feedInfo).toEqual(expectedFeed);

                await fetchMock.flush();
                expect(fetchMock.done()).toBe(true);
            } catch (err) {
                throw err;
            }
        });
    });

    it("convertRawFeedsToOrderedMap() returns an OrderedMap<> of feeds", () => {
        const om = FeedsServices.convertRawFeedsToOrderedMap(
            JSON.parse(API_FEEDS_STRING).feeds
        );
        expect(om).toEqual(IMM_FEEDS);
    });

    it("updateUnreadCont() creates a new unread count; matches snapshot", () => {
        const initUnreadMap = {
            entriesCounted: Set<string>(),
            feeds: Map<string, number>(),
            folders: Map<string, number>()
        };
        const newUnreadCount = FeedsServices.updateUnreadCount(
            initUnreadMap,
            IMM_ENTRIES,
            IMM_FEEDS
        );

        expect(newUnreadCount).toMatchSnapshot();
    });

    it("decrementUnreadCount() decreases the read count for a feed; matches snapshot", () => {
        const feedID = "5b33c76cb2438d5708dc197e";
        const initUnreadMap = {
            entriesCounted: Set<string>(),
            feeds: Map<string, number>(),
            folders: Map<string, number>()
        };
        const initUnreadCount = FeedsServices.updateUnreadCount(
            initUnreadMap,
            IMM_ENTRIES,
            IMM_FEEDS
        );

        const updatedUnreadCount = FeedsServices.decrementUnread(
            feedID,
            IMM_FEEDS,
            initUnreadCount
        );

        expect(updatedUnreadCount).toMatchSnapshot();
    });

    it("setSingleFeed() sets a feed in the OrderedMap of feeds", () => {
        const feedID = "5b33c76cb2438d5708dc197e";
        const CLONED_FEED = { ...FEED, title: "NEW TITLE" };
        const newFeedsOM = FeedsServices.setSingleFeed(CLONED_FEED, IMM_FEEDS);
        expect(newFeedsOM).toEqual(OrderedMap([[feedID, CLONED_FEED]]));
    });

    it("sortFeeds() sorts feeds in asc titular order", () => {
        const unorderedFeeds = [
            { ...FEED, _id: "BID", title: "b9Second" },
            { ...FEED, _id: "AID", title: "a9First" },
            { ...FEED, _id: "0ID", title: "09Num" }
        ];

        const orderedFeeds = [
            { ...FEED, _id: "0ID", title: "09Num" },
            { ...FEED, _id: "AID", title: "a9First" },
            { ...FEED, _id: "BID", title: "b9Second" }
        ];

        const unorderedOM = FeedsServices.convertRawFeedsToOrderedMap(
            unorderedFeeds
        );
        const expectedOM = FeedsServices.convertRawFeedsToOrderedMap(
            orderedFeeds
        );
        const sorted = FeedsServices.sortFeeds(unorderedOM);
        expect(sorted).toEqual(expectedOM);
    });
});
