import { readFileSync } from "fs";
import { resolve } from "path";
import * as Types from "../../src/client/types";

const foldersJson = readFileSync(
    resolve(__dirname + "/../rawdata/folders.raw.json")
);
const foldersArr = JSON.parse(foldersJson.toString());

const folder: Types.IFolder = foldersArr[0];

export default folder;
