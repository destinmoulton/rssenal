import { Map, Set } from "immutable";
import { readFileSync } from "fs";
import { resolve } from "path";

import FEEDS from "./feeds";

import AMMENDED_ENTRIES from "./ammendedEntries";
const entriesArray = AMMENDED_ENTRIES.toArray();
let entriesCounted = Set();
let count = 0;
let feed_id = "";

entriesArray.forEach(entry => {
    entriesCounted = entriesCounted.add(entry._id);
    feed_id = entry.feed_id;
    count++;
});

const UNREAD_MAP_FEED_ID = feed_id;
const UNREAD_MAP_FOLDER_ID = FEEDS.get(feed_id).folder_id;
const UNREAD_MAP_COUNT = count;
const UNREAD_MAP = {
    entriesCounted,
    feeds: Map([[UNREAD_MAP_FEED_ID, UNREAD_MAP_COUNT]]),
    folders: Map([[UNREAD_MAP_FOLDER_ID, UNREAD_MAP_COUNT]])
};

export {
    UNREAD_MAP,
    UNREAD_MAP_FEED_ID,
    UNREAD_MAP_FOLDER_ID,
    UNREAD_MAP_COUNT
};
