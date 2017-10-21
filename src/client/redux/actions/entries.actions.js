
import {
    ENTRIES_GET_BEGIN,
    ENTRIES_GET_COMPLETE,
    ENTRIES_UPDATE_BEGIN,
    ENTRIES_UPDATE_COMPLETE
} from "../actiontypes";

import {
    API_ENTRIES_BASE
} from "../apiendpoints";

import { feedsDecrementUnread, feedsSetAllUnreadCount } from "./feeds.actions";

export function beginGetEntries(){
    return (dispatch)=>{
        dispatch(beginGetProcess());
        dispatch(getEntries());
    }
}

function beginGetProcess(){
    return {
        type: ENTRIES_GET_BEGIN
    }
}

function getEntries(){
    return (dispatch, getState)=>{
        const url = API_ENTRIES_BASE;
        const init = {
            method: "GET"
        };

        fetch(url, init)
            .then((res)=>{
                return res.json();
            })
            .then((resObj)=>{
                if(resObj.status === "error"){
                    console.error(resObj.error);
                } else {
                    let entries = resObj.entries;
                    dispatch(getEntriesComplete(entries));
                    dispatch(entriesUpdateUnreadCount(entries));
                }
            })
    }
}

function getEntriesComplete(entries){
    return {
        type: ENTRIES_GET_COMPLETE,
        entries
    }
}

function entriesUpdateUnreadCount(entries){
    return (dispatch)=>{
        dispatch(feedsSetAllUnreadCount(entries));
    }
}

export function updateReadState(entry, hasRead){
    return (dispatch)=>{
        const url = API_ENTRIES_BASE + entry._id;
        const init = {
            method: "PUT",
            body: JSON.stringify({has_read: hasRead}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        fetch(url, init)
            .then((res)=>{
                return res.json();
            })
            .then((resObj)=>{
                if(resObj.status === "error"){
                    console.error(resObj.error);
                } else {
                    dispatch(feedsDecrementUnread(entry.feed_id));
                }
            });
    }
}