import * as fetchMock from "fetch-mock";

import * as EntriesServices from "../entries.services";
import ENTRY from "../../../../../test/data/entry";
import FEED from "../../../../../test/data/feed";
import API_ENTRIES_STRING from "../../../../../test/data/api/entries.unread";
import AMMENDED_ENTRIES from "../../../../../test/data/immutable/ammendedEntries";

import { OrderedMap } from "immutable";
import entry from "../../../../../test/data/entry";

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

    it("ammendRawEntries() builds an array of entries", () => {
        const ammended = EntriesServices.ammendRawEntries(
            FEED,
            JSON.parse(API_ENTRIES_STRING).entries
        );
        expect(ammended).toEqual(AMMENDED_ENTRIES.toArray());
    });

    it("addAmmendedEntries() adds the ammended entry array to the current Entries OrderedMap<>", () => {
        const ammended = EntriesServices.ammendRawEntries(
            FEED,
            JSON.parse(API_ENTRIES_STRING).entries
        );
        const added = EntriesServices.addAmmendedEntries(
            OrderedMap(),
            ammended
        );
        expect(added).toEqual(AMMENDED_ENTRIES);
    });

    it("ammendEntryReadStatus() changes the has_read property of an entry", () => {
        const entryID = "5b33c76cb2438d5708dc197f";

        const changedEntry = {
            ...AMMENDED_ENTRIES.get(entryID),
            has_read: true
        };

        const clonedEntries = AMMENDED_ENTRIES.toOrderedMap();

        const newEntries = EntriesServices.ammendEntryReadStatus(
            clonedEntries,
            entryID,
            true
        );

        const EXPECTED_ENTRIES = clonedEntries.set(entryID, changedEntry);

        expect(newEntries).toEqual(EXPECTED_ENTRIES);
    });
});
