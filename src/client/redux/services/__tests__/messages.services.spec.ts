import { List } from "immutable";
import * as Types from "../../../types";
import * as MessagesServices from "../messages.services";

describe("messages.services", () => {
    it("addMessage() adds a message to the list", () => {
        const messageText = "MESSAGE TEXT";
        const messageLevel = "LEVEL";
        const uid = 99;
        const expectedMessages = List([
            { message: messageText, level: messageLevel, uid }
        ]);
        const messageInfo = {
            messageText,
            level: messageLevel
        };
        const messages = MessagesServices.addMessage(messageInfo, uid, List());
        expect(messages).toEqual(expectedMessages);
    });

    it("getNextUID() returns a number plus one", () => {
        expect(MessagesServices.getNextUID(9)).toBe(10);
    });

    it("removeMessage() deletes a message from the list", () => {
        const mess1 = {
            messageText: "MESS1",
            level: "error"
        };
        const mess2 = {
            messageText: "MESS2",
            level: "success"
        };
        let fullMessages = MessagesServices.addMessage(mess1, 1, List());
        fullMessages = MessagesServices.addMessage(mess2, 2, List());

        const expectedMessages = fullMessages.remove(0);
        const messages = MessagesServices.removeMessage(
            { message: "", level: "error", uid: 1 },
            fullMessages
        );
        expect(messages).toEqual(expectedMessages);
    });
});
