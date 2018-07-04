import * as Types from "../../types";

export function getFilteredEntries(
    filter: Types.IFilter,
    currentEntries: Types.TEntries,
    feeds: Types.TFeeds
): Types.TEntries {
    let filteredEntries = currentEntries.toOrderedMap();
    switch (filter.limit) {
        case "feed":
            filteredEntries = currentEntries
                .filter(entry => {
                    return entry.feed_id === filter.id;
                })
                .toOrderedMap();
            break;
        case "folder":
            if (filter.id !== "all") {
                const feedIds = feeds
                    .filter(feed => {
                        return feed.folder_id === filter.id;
                    })
                    .map(feed => {
                        return feed._id;
                    });

                filteredEntries = currentEntries
                    .filter(entry => {
                        return feedIds.includes(entry.feed_id);
                    })
                    .toOrderedMap();
            }
            break;
    }

    return filteredEntries;
}

export function getFilterTitle(
    filter: Types.IFilter,
    feeds: Types.TFeeds,
    folders: Types.TFolders
): string {
    switch (filter.limit) {
        case "feed":
            const activeFeed = feeds.get(filter.id);
            return activeFeed.title;
        case "folder":
            if (filter.id !== "all") {
                const activeFolder = folders.get(filter.id);

                return activeFolder.name;
            }
            break;
    }
    return "All";
}
