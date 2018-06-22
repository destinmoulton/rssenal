import { Map, Set } from "immutable";

import * as ACT_TYPES from "../../actiontypes";
import DATA_ENTRY from "../../../../../test/data/entry";
import DATA_FEEDS from "../../../../../test/data/feeds";
import DATA_FEED from "../../../../../test/data/feed";
import DATA_FOLDER from "../../../../../test/data/folder";
import feedsReducer from "../feeds.reducer";

import {
    FEEDS_INITIAL_STATE,
    FEEDS_INITIAL_UNREAD_MAP
} from "../../initialstate";
import * as Types from "../../../types";

describe("feeds reducer", () => {
    it("should return initial state", () => {
        const reduction = feedsReducer(undefined, { type: null });

        expect(reduction).toEqual(FEEDS_INITIAL_STATE);
    });

    it("should handle FEEDS_ADD_BEGIN", () => {
        const action = {
            type: ACT_TYPES.FEEDS_ADD_BEGIN
        };
        const reduction = feedsReducer(undefined, action);
        expect(reduction).toEqual({
            ...FEEDS_INITIAL_STATE,
            isAddingFeed: true
        });
    });

    it("should handle FEEDS_ADD_COMPLETE", () => {
        const action = {
            type: ACT_TYPES.FEEDS_ADD_COMPLETE,
            feeds: DATA_FEEDS
        };
        const reduction = feedsReducer(undefined, action);
        expect(reduction).toEqual({
            ...FEEDS_INITIAL_STATE,
            feeds: DATA_FEEDS,
            isAddingFeed: false
        });
    });

    it("should handle FEEDS_GETALL_COMPLETE", () => {
        const action = {
            type: ACT_TYPES.FEEDS_GETALL_COMPLETE,
            feeds: DATA_FEEDS
        };
        const reduction = feedsReducer(undefined, action);
        expect(reduction).toEqual({
            ...FEEDS_INITIAL_STATE,
            feeds: DATA_FEEDS
        });
    });

    it("should handle FEEDS_SET_UNREAD", () => {
        const unreadMap: Types.IFeedsUnreadMap = {
            entriesCounted: Set([DATA_ENTRY._id]),
            feeds: Map([[DATA_FEED._id, 20]]),
            folders: Map([[DATA_FOLDER._id, 30]])
        };

        const action = {
            type: ACT_TYPES.FEEDS_SET_UNREAD,
            unreadMap
        };

        const reduction = feedsReducer(undefined, action);
        expect(reduction).toEqual({
            ...FEEDS_INITIAL_STATE,
            unreadMap
        });
    });

    it("should handle FEEDS_CLEAR_UNREAD", () => {
        const action = {
            type: ACT_TYPES.FEEDS_CLEAR_UNREAD
        };

        const reduction = feedsReducer(undefined, action);
        expect(reduction).toEqual({
            ...FEEDS_INITIAL_STATE,
            unreadMap: FEEDS_INITIAL_UNREAD_MAP
        });
    });
    it("should handle FEEDS_UPDATE_BEGIN", () => {
        const action = {
            type: ACT_TYPES.FEEDS_UPDATE_BEGIN
        };

        const reduction = feedsReducer(undefined, action);
        expect(reduction).toEqual({
            ...FEEDS_INITIAL_STATE,
            isUpdatingFeed: true
        });
    });
    it("should handle FEEDS_UPDATE_COMPLETE", () => {
        const action = {
            type: ACT_TYPES.FEEDS_UPDATE_COMPLETE,
            feeds: DATA_FEEDS
        };

        const reduction = feedsReducer(undefined, action);
        expect(reduction).toEqual({
            ...FEEDS_INITIAL_STATE,
            feeds: DATA_FEEDS,
            isUpdatingFeed: false
        });
    });
});
