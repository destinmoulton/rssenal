import * as FilterServices from "../filter.services";
import * as Types from "../../../types";
import IMM_ENTRIES from "../../../../../test/data/immutable/ammendedEntries";
import IMM_FEEDS from "../../../../../test/data/immutable/feeds";
import IMM_FOLDERS from "../../../../../test/data/immutable/folders";
import FEED from "../../../../../test/data/feed";
import { OrderedMap } from "immutable";

const FEED_ID = "5b33c76cb2438d5708dc197e";
describe("filter.services", () => {
    describe("getFilterTitle()", () => {
        it("gets filter title for limit to All", () => {
            const filter = { limit: "all" };
            const title = FilterServices.getFilterTitle(
                filter,
                IMM_FEEDS,
                IMM_FOLDERS
            );
            expect(title).toBe("All");
        });

        it("gets title for limit to feed", () => {
            const filter = { limit: "feed", id: FEED_ID };
            const title = FilterServices.getFilterTitle(
                filter,
                IMM_FEEDS,
                IMM_FOLDERS
            );
            expect(title).toBe(FEED.title);
        });

        it("gets title for limit to folder", () => {
            const folder = IMM_FOLDERS.slice(0, 1).toArray()[0];
            const filter = { limit: "folder", id: folder._id };
            const title = FilterServices.getFilterTitle(
                filter,
                IMM_FEEDS,
                IMM_FOLDERS
            );
            expect(title).toBe(folder.name);
        });
    });

    describe("getFilteredEntries()", () => {
        const entries = [];

        it("gets all when filter limit is all", () => {
            const filter = { limit: "all" };
            const filteredEntries = FilterServices.getFilteredEntries(
                filter,
                IMM_ENTRIES,
                IMM_FEEDS
            );
            expect(filteredEntries).toEqual(IMM_ENTRIES);
        });

        it("gets a limited set for a feed filter", () => {
            const tmpFeedID = "TEST_FEED_ID";
            const tmp = IMM_ENTRIES.toArray();
            tmp[0]._id = "FIRST";
            tmp[0].feed_id = tmpFeedID;
            tmp[3]._id = "SECOND";
            tmp[3].feed_id = tmpFeedID;
            const newTuples = tmp.map(entry => [entry._id, entry]);
            const entries = OrderedMap<string, Types.IEntry>(newTuples);
            const filter = { limit: "feed", id: tmpFeedID };
            const filteredEntries = FilterServices.getFilteredEntries(
                filter,
                entries,
                IMM_FEEDS
            );
            expect(filteredEntries.keySeq().toArray()).toEqual([
                "FIRST",
                "SECOND"
            ]);
        });

        it("gets a limited set for a folder filter", () => {
            const tmpFeedID = "TEST_FEED_ID";
            const tmpFolderID = "EX_FOLDER_ID";
            const tmp = IMM_ENTRIES.toArray();
            tmp[0]._id = "FIRST";
            tmp[0].feed_id = tmpFeedID;
            tmp[3]._id = "SECOND";
            tmp[3].feed_id = tmpFeedID;
            const newTuples = tmp.map(entry => [entry._id, entry]);
            const entries = OrderedMap<Types.TEntryID, Types.IEntry>(newTuples);

            const newFeed = { ...FEED, _id: tmpFeedID, folder_id: tmpFolderID };
            const feeds = OrderedMap<Types.TFeedID, Types.IFeed>([
                [tmpFeedID, newFeed]
            ]);

            const filter = { limit: "folder", id: tmpFolderID };
            const filteredEntries = FilterServices.getFilteredEntries(
                filter,
                entries,
                feeds
            );
            expect(filteredEntries.keySeq().toArray()).toEqual([
                "FIRST",
                "SECOND"
            ]);
        });
    });
});
