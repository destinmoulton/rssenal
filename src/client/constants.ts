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

// Allows Tags for the HTML Sanitizer
export const SANITIZER_ALLOWED_CONTENT_TAGS = [
    "a",
    "b",
    "blockquote",
    "br",
    "code",
    "em",
    "figure",
    "figcaption",
    "i",
    "li",
    "ol",
    "p",
    "pre",
    "span",
    "strong",
    "table",
    "tbody",
    "thead",
    "td",
    "th",
    "tr",
    "ul"
];

export const SANITIZER_ALLOWED_TAG_ATTRIBUTES = {
    a: ["href", "target"],
    blockquote: <any>[],
    code: <any>["class"],
    em: <any>[],
    figure: <any>[],
    figcaption: <any>[],
    h1: <any>[],
    h2: <any>[],
    h3: <any>[],
    h4: <any>[],
    h5: <any>[],
    img: ["src", "class"],
    li: <any>[],
    ol: <any>[],
    p: <any>[],
    span: <any>[],
    strong: <any>[],
    td: <any>[],
    th: <any>[],
    tr: <any>[],
    ul: <any>[]
};
