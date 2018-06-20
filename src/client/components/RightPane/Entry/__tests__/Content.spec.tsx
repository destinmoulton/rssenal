import * as React from "react";
import { mount } from "enzyme";

import Content from "../Content";
import ENTRY from "../../../../../../test/data/entry";

const IMG = `<img src="http://test.image.com/image.jpeg"/>`;
const ENTRY_WITH_IMAGE = { ...ENTRY, content: ENTRY.content + IMG };
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
            <Content entry={ENTRY_WITH_IMAGE} shouldShowImages={true} />
        );
        const dangerousHTML = wrapper
            .find("div.rss-entry-content-container")
            .prop("dangerouslySetInnerHTML");
        expect(dangerousHTML.__html.includes("<img")).toBe(true);
    });

    it("renders content with images disabled", () => {
        const wrapper = mount(
            <Content entry={ENTRY_WITH_IMAGE} shouldShowImages={false} />
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
