import * as fetchMock from "fetch-mock";

import * as FeedsServices from "../feeds.services";
import ENTRY from "../../../../../test/data/entry";
import FEED from "../../../../../test/data/feed";
import API_ENTRIES_STRING from "../../../../../test/data/api/entries.unread";
import AMMENDED_ENTRIES from "../../../../../test/data/immutable/ammendedEntries";

import { OrderedMap } from "immutable";
import entry from "../../../../../test/data/entry";

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
                expect(fetchMock.done()).toBe(true);
            } catch (err) {}
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
            const URL = "/api/feeds/FEED_ID";
            fetchMock.deleteOnce(URL, {
                body: {
                    status: "success"
                }
            });

            expect.assertions(2);

            try {
                const res = await FeedsServices.apiDeleteFeed("FEED_ID");
                expect(res).toBe(true);
                expect(fetchMock.done()).toBe(true);
            } catch (err) {}
        });
    });
});
