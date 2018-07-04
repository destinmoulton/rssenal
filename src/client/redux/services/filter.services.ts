import * as Types from "../../types";

export function filterVisibleEntries(
    filter: Types.IFilter,
    currentEntries: Types.TEntries,
    feeds: Types.TFeeds
) {
    let title = "All";

    let filteredEntries = currentEntries.toOrderedMap();
    switch (filter.limit) {
        case "feed":
            const activeFeed = feeds.get(filter.id);
            title = activeFeed.title;

            filteredEntries = currentEntries
                .filter(entry => {
                    return entry.feed_id === filter.id;
                })
                .toOrderedMap();
            break;
        case "folder":
            if (filter.id !== "all") {
                const activeFolder = folders.get(filter.id);

                title = activeFolder.name;

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

    return { title, filteredEntries };
}
