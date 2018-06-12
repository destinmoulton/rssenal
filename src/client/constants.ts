export const SORT_MENU_OPTIONS = [
    { value: "publish_date:asc", text: "Date - Oldest First" },
    { value: "publish_date:desc", text: "Date - Newest First" },
    { value: "title:asc", text: "Title" }
];

export const SETTING_SHOW_IMAGES = "show_images";
export const SETTING_SHOW_ENTRIES_READ = "show_entries_has_read";

// Tuples of default settings
export const DEFAULT_SETTINGS = [
    [
        SETTING_SHOW_IMAGES,
        {
            name: "Show Images",
            type: "toggle",
            refresh_entries_on_change: false,
            value: true
        }
    ],
    [
        SETTING_SHOW_ENTRIES_READ,
        {
            name: "Show Entries Already Read",
            type: "toggle",
            refresh_entries_on_change: true,
            value: false
        }
    ]
];
