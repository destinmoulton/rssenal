import { readFileSync } from "fs";
import { resolve } from "path";
import * as Types from "../../src/client/types";

const entriesJSON = readFileSync(resolve(__dirname + "/json/feeds.raw.json"));
const entriesArr = JSON.parse(entriesJSON.toString());

const entry: Types.IEntry = entriesArr[0];

export default entry;
