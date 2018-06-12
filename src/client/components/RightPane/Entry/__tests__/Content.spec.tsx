import * as React from "react";
import { shallow, render, mount } from "enzyme";

import Content from "../Content";

const CONTENT_WITHOUT_IMAGE = "Test Content";
const CONTENT_WITH_IMAGE =
    CONTENT_WITHOUT_IMAGE + `<img src="http://test.image.com/image.jpeg"/>`;

const ENTRY = {
    _id: "0test1",
    content: CONTENT_WITH_IMAGE,
    creator: "McJesty",
    feed_id: "ABC123_test_feed_id",
    feedTitle: "Test Feed Title",
    guid: "guidtest",
    timeAgo: "5 days ago",
    title: "Test Title",
    link: "https://test.link.com/blog-post.html",
    content_snippet: "Content snippet",
    publish_date: "2016-05-18T16:00:00Z",
    has_read: false
};

describe("<Content />", () => {
    describe("renders the info container", () => {
        let wrapper: any = null;
        beforeEach(() => {
            wrapper = mount(<Content entry={ENTRY} shouldShowImages={true} />);
        });

        it("contains the info container", () => {
            expect(wrapper.find("div.rss-entry-info-container")).toHaveLength(
                1
            );
        });
        it("contains the entry title", () => {
            const info = wrapper.find("div.rss-entry-info-container");
            expect(info.html().includes(ENTRY.feedTitle)).toBe(true);
        });

        it("contains the creator", () => {
            const info = wrapper.find("div.rss-entry-info-container");
            expect(info.html().includes(ENTRY.creator)).toBe(true);
        });

        it("contains the timeAgo", () => {
            const info = wrapper.find("div.rss-entry-info-container");
            expect(info.html().includes(ENTRY.timeAgo)).toBe(true);
        });
    });

    it("renders content with images enabled", () => {
        const wrapper = mount(
            <Content entry={ENTRY} shouldShowImages={true} />
        );
        const dangerousHTML = wrapper
            .find("div.rss-entry-content-container")
            .prop("dangerouslySetInnerHTML");
        expect(dangerousHTML.__html.includes("<img")).toBe(true);
    });

    it("renders content with images disabled", () => {
        const wrapper = mount(
            <Content entry={ENTRY} shouldShowImages={false} />
        );
        const dangerousHTML = wrapper
            .find("div.rss-entry-content-container")
            .prop("dangerouslySetInnerHTML");
        expect(dangerousHTML.__html.includes("<img")).toBe(false);
    });

    it("renders entry link", () => {
        const wrapper = mount(
            <Content entry={ENTRY} shouldShowImages={false} />
        );

        expect(
            wrapper.find("div.rss-entry-link-container > a").prop("href")
        ).toBe(ENTRY.link);
    });
});
