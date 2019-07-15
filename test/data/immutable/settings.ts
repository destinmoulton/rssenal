import { Map } from "immutable";
import * as Types from "../../../src/client/types";
const settings = [
    [
        "show_images",
        {
            name: "Show Images",
            type: "toggle",
            refresh_entries_on_change: false,
            value: true
        }
    ],
    [
        "show_entries_has_read",
        {
            name: "Show Entries Already Read",
            type: "toggle",
            refresh_entries_on_change: true,
            value: false
        }
    ]
];

const settingsMap: Types.TSettings = Map(settings);
export default settingsMap;
