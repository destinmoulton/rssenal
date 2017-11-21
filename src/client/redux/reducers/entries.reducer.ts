
import { OrderedMap } from "immutable";

import {
    ENTRIES_GET_COMPLETE,
    ENTRIES_MARKREAD_COMPLETE
} from "../actiontypes";

import { TEntryID, IEntry, IEntriesAction, IReducerStateEntries } from "../../interfaces";

const INITIAL_STATE: IReducerStateEntries = {
    entries: OrderedMap<TEntryID, IEntry>()
};

type EntryTuple = [TEntryID, IEntry];

function entriesReducer(state = INITIAL_STATE, action: IEntriesAction){
    switch(action.type){
        case ENTRIES_GET_COMPLETE: {
            const { entries } = state;

            let newMappedEntries = entries;
            action.entries.forEach((entry)=>{
                if(newMappedEntries.has(entry._id)){
                    if(!action.showUnread === entry.has_read){
                        newMappedEntries = newMappedEntries.set(entry._id, entry);
                    } else {
                        newMappedEntries = newMappedEntries.delete(entry._id);
                    }
                } else {
                    newMappedEntries = newMappedEntries.set(entry._id, entry);
                }
            });
            
            return {
                ...state,
                entries: newMappedEntries
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