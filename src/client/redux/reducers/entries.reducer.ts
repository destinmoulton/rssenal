
import { OrderedMap } from "immutable";

import {
    ENTRIES_GET_COMPLETE,
    ENTRIES_MARKREAD_COMPLETE
} from "../actiontypes";

import { TEntryID, IEntry, IEntriesAction, IReducerStateEntries } from "../../interfaces";

const INITIAL_STATE: IReducerStateEntries = {
    entries: OrderedMap<TEntryID, IEntry>()
};

type IEntryTuple = [TEntryID, IEntry];

function entriesReducer(state = INITIAL_STATE, action: IEntriesAction){
    switch(action.type){
        case ENTRIES_GET_COMPLETE: {
            const { entries } = state;

            let tuples: IEntryTuple[] = [];
            action.entries.forEach((entry)=>{
                tuples.push([entry._id, entry]);
            });
            
            return {
                ...state,
                entries: OrderedMap(tuples)
            }
        }

        case ENTRIES_MARKREAD_COMPLETE:{
            const { entries } = state;
            const newEntries = entries.set(action.newEntry._id, action.newEntry);
            return {
                ...state,
                entries: newEntries
            }
        }
        default:
            return {...state};
    }
}

export default entriesReducer;