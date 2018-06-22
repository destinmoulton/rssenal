import * as ACT_TYPES from "../../actiontypes";

import feedsReducer from "../feeds.reducer";

import {
    FEEDS_INITIAL_STATE,
    FEEDS_INITIAL_UNREAD_MAP
} from "../../initialstate";
import DATA_FEEDS from "../../../../../test/data/feeds";

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
});
