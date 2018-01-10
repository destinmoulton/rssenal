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
        "blockquote",
        "br",
        "code",
        "em",
        "figure",
        "figcaption",
        "li",
        "ol",
        "p",
        "pre",
        "span",
        "strong",
        "table",
        "tbody",
        "td",
        "tr",
        "ul"
    ];

    if (shouldShowImages) {
        allowedTags.push("img");
    }

    let allowedAttributes = {
        a: ["href", "target"],
        blockquote: <any>[],
        code: <any>[],
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
        pre: <any>[],
        span: <any>[],
        strong: <any>[],
        td: <any>[],
        tr: <any>[],
        ul: <any>[]
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
        h1: "strong",
        h2: "strong",
        h3: "strong",
        h4: "strong",
        h5: "strong",
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

    let sanitized = sanitizeHTML(dirtyContent, {
        allowedTags,
        allowedAttributes,
        exclusiveFilter,
        transformTags
    });
    console.log(sanitized);
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
