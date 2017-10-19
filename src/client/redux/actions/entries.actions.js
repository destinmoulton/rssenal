
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
import { feedgroupsDecrementUnread, feedgroupsSetAllUnreadCount } from "./feedgroups.actions";

export function beginUpdateAndGetEntries(){
    return (dispatch)=>{
        dispatch(beginUpdateProcess());
        dispatch(updateEntries());
    };
}

function beginUpdateProcess(){
    return {
        type: ENTRIES_UPDATE_BEGIN
    }
}

function updateEntries(){
    return (dispatch)=>{
        const url = API_ENTRIES_BASE;
        const init = {
            method: "PUT",
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
                dispatch(beginGetEntries());
            })
    }
}

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
    return (dispatch)=>{
        const url = API_ENTRIES_BASE;
        const init = {
            method: "GET"
        };

        fetch(url, init)
            .then((res)=>{
                return res.json();
            })
            .then((resObj)=>{
                dispatch(getEntriesComplete(resObj.entries));
                dispatch(entriesUpdateUnreadCount(resObj.entries));
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
        dispatch(feedgroupsSetAllUnreadCount());
    }
}

export function entryMarkRead(feedId, groupId){
    return (dispatch)=>{
        dispatch(feedsDecrementUnread(feedId));
        dispatch(feedgroupsDecrementUnread(groupId));
    }
}