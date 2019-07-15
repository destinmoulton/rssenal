import { List } from "immutable";

import * as ACT_TYPES from "../../actiontypes";

import messagesReducer from "../messages.reducer";

import { MESSAGES_INITIAL_STATE } from "../../initialstate";
import * as Types from "../../../types";

describe("messages reducer", () => {
    it("should return initial state", () => {
        const reduction = messagesReducer(undefined, {
            type: null,
            messages: null
        });

        expect(reduction).toEqual(MESSAGES_INITIAL_STATE);
    });

    it("should handle MESSAGES_ADD_COMPLETE", () => {
        const message: Types.IMessage = {
            message: "Test Message",
            level: "success"
        };
        const messages: Types.TMessages = List([message]);
        const action = {
            type: ACT_TYPES.MESSAGES_ADD_COMPLETE,
            messages,
            lastUID: 2
        };
        const reduction = messagesReducer(undefined, action);
        expect(reduction).toEqual({
            messages,
            lastUID: 2
        });
    });

    it("should handle MESSAGES_REMOVE_COMPLETE", () => {
        const message: Types.IMessage = {
            message: "Test Message",
            level: "success",
            uid: 1
        };
        const messages: Types.TMessages = List([message]);
        const action = {
            type: ACT_TYPES.MESSAGES_REMOVE_COMPLETE,
            messages,
            lastUID: 2
        };
        const reduction = messagesReducer(undefined, action);
        expect(reduction).toEqual({
            ...MESSAGES_INITIAL_STATE,
            messages
        });
    });
});
