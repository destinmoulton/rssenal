import { OrderedMap } from "immutable";
import { readFileSync } from "fs";
import { resolve } from "path";
import * as Types from "../../../src/client/types";

const ammendedEntriesJSON = readFileSync(
    resolve(__dirname + "/../json/ammendedEntries.json")
);
const entriesArray = JSON.parse(ammendedEntriesJSON.toString());

let entriesOrderedMap: Types.TEntries = OrderedMap();
entriesArray.map((entry: Types.IEntry) => {
    entriesOrderedMap = entriesOrderedMap.set(entry._id, entry);
});

export default OrderedMap(entriesOrderedMap);
