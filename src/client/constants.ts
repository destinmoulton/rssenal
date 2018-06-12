export const SORT_MENU_OPTIONS = [
    { value: "publish_date:asc", text: "Date - Oldest First" },
    { value: "publish_date:desc", text: "Date - Newest First" },
    { value: "title:asc", text: "Title" }
];

// Tuples of default settings
export const DEFAULT_SETTINGS = [
    [
        "show_images",
        {
            name: "Show Images",
            type: "toggle",
            refresh_entries_on_change: false,
            value: true
        }
    ],
    [
        "show_entries_has_read",
        {
            name: "Show Entries Already Read",
            type: "toggle",
            refresh_entries_on_change: true,
            value: false
        }
    ]
];
