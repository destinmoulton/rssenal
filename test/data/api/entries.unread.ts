import { readFileSync } from "fs";
import { resolve } from "path";

const entriesJSON = readFileSync(
    resolve(__dirname + "/../json/entries.unread.json")
);

export default entriesJSON.toString();