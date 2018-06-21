import {
    SANITIZER_ALLOWED_CONTENT_TAGS,
    SANITIZER_ALLOWED_TAG_ATTRIBUTES
} from "../constants";

interface ISanitizeHTML {
    (html: string, options: any): string;
}
const sanitizeHTML: ISanitizeHTML = require("sanitize-html-react");

export const sanitizeEntryContent = (
    dirtyContent: string,
    shouldShowImages: boolean
): string => {
    let allowedTags = SANITIZER_ALLOWED_CONTENT_TAGS.slice();
    if (shouldShowImages) {
        allowedTags.push("img");
    }

    let transformTags = {
        a: (tagName: string, attribs: any) => {
            if (attribs.href && attribs.href[0] !== "/") {
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
        b: "strong",
        h1: "strong",
        h2: "strong",
        h3: "strong",
        h4: "strong",
        h5: "strong",
        i: "em",
        img: (tagName: string, attribs: any) => {
            if (attribs.src[0] === "/") {
                // Don't display images with a relative path (as they don't exist on this server)
                return {
                    tagName: "span",
                    attribs: {}
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

    const tagsFilterIfEmpty = ["span", "p", "a", "em"];
    let exclusiveFilter = (frame: any) => {
        return tagsFilterIfEmpty.includes(frame.tag) && !frame.text.trim();
    };

    let sanitized = sanitizeHTML(dirtyContent, {
        allowedTags,
        SANITIZER_ALLOWED_TAG_ATTRIBUTES,
        exclusiveFilter,
        transformTags
    });

    // Finally, replace any stray <br>'s at the beginning
    return sanitized.replace(/^(<br \/>)*/, "");
};

export const sanitizeEntryTitle = (dirtyTitle: string) => {
    let allowedTags: string[] = [];
    let allowedAttributes: string[] = [];
    return sanitizeHTML(dirtyTitle, {
        allowedTags,
        allowedAttributes
    });
};
