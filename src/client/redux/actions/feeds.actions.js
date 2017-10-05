
import {
    FEEDS_ADD_BEGIN,
    FEEDS_ADD_COMPLETE,
    FEEDS_GETALL_COMPLETE
} from "../actiontypes";

import {
    API_FEEDS_BASE
} from "../apiendpoints";

export function beginAddFeed(feedInfo){
    return (dispatch)=>{
        dispatch(beginAddFeedProcess());
        dispatch(addFeed(feedInfo));
    }
}

function beginAddFeedProcess(){
    return {
        type: FEEDS_ADD_BEGIN
    }
}

function addFeed(feedInfo){
    return (dispatch)=>{
        const url = API_FEEDS_BASE;
        const init = {
            method: "POST",
            body: JSON.stringify({...feedInfo}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        fetch(url, init)
            .then((res)=>{
                return res.json();
            })
            .then((feedObj)=>{
                if(feedObj.status === "error"){
                    console.error(feedObj.error);
                } else if(feedObj.status === "success"){
                    dispatch(addFeedComplete(feedObj.feedInfo));
                }
            })
    }
}

function addFeedComplete(feed){
    return {
        type: FEEDS_ADD_COMPLETE,
        feed
    }
}

export function getAllFeeds(){
    return (dispatch)=>{
        const url = API_FEEDS_BASE;
        const init = {
            method: "GET"
        };
        fetch(url, init)
            .then((res)=>{
                return res.json();
            })
            .then((resObj)=>{
                if(resObj.status==="error"){
                    console.error(resObj.error);
                } else if(resObj.status==="success"){
                    dispatch(getAllFeedsComplete(resObj.feeds));
                }
            })
    }
}

function getAllFeedsComplete(feeds){
    return {
        type: FEEDS_GETALL_COMPLETE,
        feeds
    }
}