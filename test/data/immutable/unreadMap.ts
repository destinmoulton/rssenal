import { Map, Set } from "immutable";
import { readFileSync } from "fs";
import { resolve } from "path";

import FEEDS from "./feeds";

const ammendedEntriesJSON = readFileSync(
    resolve(__dirname + "/../json/ammendedEntries.json")
);
const entriesArray = JSON.parse(ammendedEntriesJSON.toString());
let entriesCounted = Set();
let count = 0;
let feed_id = "";

entriesArray.forEach(entry => {
    entriesCounted = entriesCounted.add(entry._id);
    feed_id = entry.feed_id;
    count++;
});

const folder_id = FEEDS.get(feed_id).folder_id;
export default {
    entriesCounted,
    feeds: Map([[feed_id, count]]),
    folders: Map([[folder_id, count]])
};
