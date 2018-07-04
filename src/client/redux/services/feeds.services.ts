import { generateJWTJSONHeaders, generateJWTHeaders } from "../../lib/headers";
import * as Types from "../../types";

export function feedsUpdateUnreadCount(
    unreadMap: Types.IFeedsUnreadMap,
    entries: Types.IEntry[],
    feeds: Types.TFeeds
) {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        let entriesCounted = unreadMap.entriesCounted;
        let unreadFeeds = unreadMap.feeds;
        let unreadFolders = unreadMap.folders;

        entries.map((entry: Types.IEntry) => {
            if (!entriesCounted.has(entry._id) && !entry.has_read) {
                entriesCounted = entriesCounted.add(entry._id);

                const feed = feeds.get(entry.feed_id);

                if (!unreadFeeds.has(feed._id)) {
                    unreadFeeds = unreadFeeds.set(feed._id, 1);
                } else {
                    const countUnread: number = unreadFeeds.get(feed._id);
                    unreadFeeds = unreadFeeds.set(feed._id, countUnread + 1);
                }

                if (!unreadFolders.has(feed.folder_id)) {
                    unreadFolders = unreadFolders.set(feed.folder_id, 1);
                } else {
                    const countUnread: number = unreadFolders.get(
                        feed.folder_id
                    );
                    unreadFolders = unreadFolders.set(
                        feed.folder_id,
                        countUnread + 1
                    );
                }
            }
        });

        const newUnreadMap = {
            entriesCounted,
            feeds: unreadFeeds,
            folders: unreadFolders
        };

        dispatch(feedsSetUnread(newUnreadMap));
    };
}
