import { OrderedMap } from "immutable";
import { readFileSync } from "fs";
import * as moment from "moment";
import { resolve } from "path";
import * as Types from "../../../src/client/types";

const entriesJSON = readFileSync(
    resolve(__dirname + "/../json/entries.unread.json")
);
const entriesObj = JSON.parse(entriesJSON.toString());
const entries = entriesObj.entries;

let entriesOrderedMap: Types.TEntries = OrderedMap();
entries.map((entry: Types.IEntry) => {
    entry.feedTitle = "High Scalability";
    entry.timeAgo = moment(entry.publish_date).fromNow();
    entriesOrderedMap = entriesOrderedMap.set(entry._id, entry);
});

export default OrderedMap(entriesOrderedMap);
