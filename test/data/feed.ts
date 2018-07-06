import { readFileSync } from "fs";
import { resolve } from "path";
import * as Types from "../../src/client/types";

const feedsJson = readFileSync(resolve(__dirname + "/json/feeds.raw.json"));
const feedsArr = JSON.parse(feedsJson.toString());

const feed: Types.IFeed = feedsArr[0];

export default feed;
