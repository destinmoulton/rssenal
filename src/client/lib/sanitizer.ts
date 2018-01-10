interface ISanitizeHTML {
    (html: string, options: any): string;
}
const sanitizeHTML: ISanitizeHTML = require("sanitize-html-react");

export const sanitizeEntryContent = (
    dirtyContent: string,
    shouldShowImages: boolean
): string => {
    let allowedTags = [
        "a",
        "b",
        "br",
        "em",
        "figure",
        "figcaption",
        "p",
        "span",
        "strong",
        "ul",
        "ol",
        "li",
        "table",
        "tbody",
        "tr",
        "td"
    ];

    if (shouldShowImages) {
        allowedTags.push("img");
    }

    let allowedAttributes: {
        a: ["href", "target"];
        div: [""];
        img: ["src", "class"];
        span: [""];
        p: [""];
    };

    let transformTags = {
        a: (tagName: string, attribs: any) => {
            if (attribs.href) {
                return {
                    tagName,
                    attribs: {
                        href: attribs.href,
                        target: "_blank"
                    }
                };
            } else {
                return {
                    tagName: "span"
                };
            }
        },
        img: (tagName: string, attribs: any) => {
            if (attribs.src[0] === "/") {
                // Don't display images with a relative path (as they don't exist on this server)
                return {
                    tagName: "span"
                };
            } else {
                return {
                    tagName,
                    attribs: {
                        src: attribs.src,
                        class: "rss-entry-content-body-img"
                    }
                };
            }
        }
    };

    const tagsFilterIfEmpty = ["span", "p", "a"];
    let exclusiveFilter = (frame: any) => {
        return tagsFilterIfEmpty.includes(frame.tag) && !frame.text.trim();
    };

    return sanitizeHTML(dirtyContent, {
        allowedTags,
        allowedAttributes,
        exclusiveFilter,
        transformTags
    });
};

export const sanitizeEntryTitle = (dirtyTitle: string) => {
    let allowedTags: string[] = [];
    let allowedAttributes: string[] = [];
    return sanitizeHTML(dirtyTitle, {
        allowedTags,
        allowedAttributes
    });
};
