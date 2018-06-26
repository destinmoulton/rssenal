import { OrderedMap } from "immutable";
import { readFileSync } from "fs";
import { resolve } from "path";
import * as Types from "../../src/client/types";

const feedsJson = readFileSync(resolve(__dirname + "/json/feeds.raw.json"));
const feedsArr = JSON.parse(feedsJson.toString());

let feedsOrderedMap: Types.TFeeds = OrderedMap();
feedsArr.map((feed: Types.IFeed) => {
    feedsOrderedMap = feedsOrderedMap.set(feed._id, feed);
});

export default OrderedMap(feedsOrderedMap);
