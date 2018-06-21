import { OrderedMap } from "immutable";
import * as Types from "../types";

export const AUTH_INITIAL_STATE: Types.IReducerStateAuth = {
    authenticationError: "",
    isAuthorized: false,
    isValidatingToken: false
};

export const ENTRIES_INITIAL_STATE: Types.IReducerStateEntries = {
    entries: OrderedMap<Types.TEntryID, Types.IEntry>()
};
