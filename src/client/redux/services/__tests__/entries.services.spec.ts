import * as fetchMock from "fetch-mock";

import * as EntriesServices from "../entries.services";
import ENTRY from "../../../../../test/data/entry";
describe("entries.services", () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
        localStorage.clear();
    });

    describe("apiGetentriesForFeed()", () => {
        it("throws an error for an error response", async () => {
            const URL =
                "/api/entries/?showEntriesHasRead=true&feedId=TESTFEEDID";
            fetchMock.getOnce(URL, { status: "error" });

            expect.assertions(2);

            try {
                await EntriesServices.apiGetEntriesForFeed("TESTFEEDID", true);
            } catch (err) {
                expect(err).toBeInstanceOf(Error);
                expect(fetchMock.done()).toBe(true);
            }
        });

        it("returns the entries for a valid response", async () => {
            const expectedEntries = ["TEST ENTRIES"];
            const URL =
                "/api/entries/?showEntriesHasRead=true&feedId=TESTFEEDID";
            fetchMock.getOnce(URL, {
                status: "success",
                entries: expectedEntries
            });

            expect.assertions(2);

            try {
                const entries = await EntriesServices.apiGetEntriesForFeed(
                    "TESTFEEDID",
                    true
                );
                expect(entries).toEqual(expectedEntries);
                expect(fetchMock.done()).toBe(true);
            } catch (err) {}
        });
    });

    describe("apiUpdateEntryHasRead()", () => {
        it("throws an error for an error response", async () => {
            const URL = "/api/entries/" + ENTRY._id;
            fetchMock.putOnce(URL, { body: { status: "error" } });

            expect.assertions(2);

            try {
                await EntriesServices.apiUpdateEntryHasRead(ENTRY, true);
            } catch (err) {
                expect(err).toBeInstanceOf(Error);
                expect(fetchMock.done()).toBe(true);
            }
        });

        it("returns true for a valid mark read change", async () => {
            const URL = "/api/entries/" + ENTRY._id;
            fetchMock.putOnce(URL, { body: { status: "success" } });

            expect.assertions(2);

            try {
                const res = await EntriesServices.apiUpdateEntryHasRead(
                    ENTRY,
                    true
                );
                expect(res).toBe(true);
                expect(fetchMock.done()).toBe(true);
            } catch (err) {}
        });
    });
});
