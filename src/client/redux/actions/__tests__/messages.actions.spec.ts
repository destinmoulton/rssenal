import { List } from "immutable";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as MessagesActions from "../messages.actions";
import * as ACT_TYPES from "../../actiontypes";
import { MESSAGES_INITIAL_STATE } from "../../initialstate";
import * as Types from "../../../types";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("messages redux actions", () => {
    afterEach(() => {});

    it("message action fires MESSAGES_ADD_COMPLETE", () => {
        const messageText = "TEST MESSAGE";
        const level = "error";
        let expectedMessages = List([{ message: messageText, level, uid: 1 }]);

        const expectedActions = [
            {
                type: ACT_TYPES.MESSAGES_ADD_COMPLETE,
                messages: expectedMessages,
                lastUID: 1
            }
        ];

        const store = mockStore({ messagesStore: MESSAGES_INITIAL_STATE });

        store.dispatch(MessagesActions.message(messageText, level));

        expect(store.getActions()).toEqual(expectedActions);
    });

    it("messageRemove fires MESSAGES_REMOVE_COMPLETE", () => {
        const messageText = "TEST MESSAGE";
        const level = "error";
        const message: Types.IMessage = { message: messageText, level, uid: 1 };
        let initialMessages = List([message]);

        let expectedActions = [
            {
                type: ACT_TYPES.MESSAGES_REMOVE_COMPLETE,
                messages: List()
            }
        ];

        const store = mockStore({
            messagesStore: { messages: initialMessages, lastUID: 1 }
        });

        store.dispatch(MessagesActions.messageRemove(message));
        expect(store.getActions()).toEqual(expectedActions);
    });
});
