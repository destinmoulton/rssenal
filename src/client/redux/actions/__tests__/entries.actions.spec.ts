import * as fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as EntriesActions from "../entries.actions";
import * as ACT_TYPES from "../../actiontypes";
import { ENTRIES_INITIAL_STATE } from "../../initialstate";
import * as Types from "../../../types";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("entries.actions", () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
        localStorage.clear();
    });

    it("entriesGetAllForFeed() fetches and ammends entries", () => {
        fetchMock.getOnce("/api/entries/", {
            body: {
                
            }
            status: 200
        });

        const expectedActions = [
            { type: ACT_TYPES.ENTRIES_SET_ALL, entries: {} }
        ];

        const store = mockStore({ authStore: ENTRIES_INITIAL_STATE });
        return store
            .dispatch(EntriesActions.entriesGetAllForFeed("FEED_ID"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});
