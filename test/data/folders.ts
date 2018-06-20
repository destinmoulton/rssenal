import { OrderedMap } from "immutable";
import { readFileSync } from "fs";
import { resolve } from "path";
import * as Types from "../../src/client/types";

const foldersJson = readFileSync(
    resolve(__dirname + "/../rawdata/folders.raw.json")
);
const foldersArr = JSON.parse(foldersJson.toString());

let foldersOrderedMap: Types.TFolders = OrderedMap();
foldersArr.map((folder: Types.IFolder) => {
    foldersOrderedMap = foldersOrderedMap.set(folder._id, folder);
});

export default OrderedMap(foldersOrderedMap);
