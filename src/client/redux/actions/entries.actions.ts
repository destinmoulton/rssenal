
import {
    ENTRIES_GET_BEGIN,
    ENTRIES_GET_COMPLETE,
    ENTRIES_MARKREAD_COMPLETE,
    ENTRIES_UPDATE_BEGIN,
    ENTRIES_UPDATE_COMPLETE
} from "../actiontypes";

import {
    API_ENTRIES_BASE
} from "../apiendpoints";

import {
    JSON_HEADERS
} from "../../lib/headers";

import { feedsDecrementUnread, feedsSetAllUnreadCount } from "./feeds.actions";

import { IDispatch, IEntry, IGetState, TEntries } from "../../interfaces";

export function beginGetEntries(){
    return (dispatch: IDispatch)=>{
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
    return (dispatch: IDispatch, getState: IGetState)=>{
        const { settings } = getState();
        let showUnread = true;
        settings.settings.forEach((setting)=>{
            if(setting.key === "show_unread"){
                showUnread = setting.value;
            }
        });
        const queryString = "?hasRead=" + !showUnread;
        const url = API_ENTRIES_BASE + queryString;
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
                    dispatch(getEntriesComplete(entries, showUnread));
                    dispatch(feedsSetAllUnreadCount(entries));
                }
            })
            .catch((err)=>{
                console.error(err);
            })
    }
}

function getEntriesComplete(entries: TEntries, showUnread: boolean){
    return {
        type: ENTRIES_GET_COMPLETE,
        entries,
        showUnread
    }
}

export function updateReadState(entry: IEntry, hasRead: boolean){
    return (dispatch: IDispatch)=>{
        const url = API_ENTRIES_BASE + entry._id;
        const init = {
            method: "PUT",
            body: JSON.stringify({has_read: hasRead}),
            headers: JSON_HEADERS
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
                    dispatch(entryMarkReadComplete(resObj.entry));
                }
            })
            .catch((err)=>{
                console.error(err);
            })
    }
}

function entryMarkReadComplete(newEntry: IEntry){
    return {
        type: ENTRIES_MARKREAD_COMPLETE,
        newEntry
    }
}