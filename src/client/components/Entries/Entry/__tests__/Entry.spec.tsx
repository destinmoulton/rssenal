import * as React from "react";

import { mount, shallow } from "enzyme";

import Entry from "../Entry";
import Content from "../Content";

const ENTRY = {
    _id: "0test1",
    content: "Test Content",
    creator: "McJesty",
    feed_id: "ABC123_test_feed_id",
    feedTitle: "Test Feed Title",
    guid: "guidtest",
    timeAgo: "5 days ago",
    title: "Test Title",
    link: "https://test.link.com/blog-post.html",
    content_snippet: "Content snippet",
    publish_date: "2016-05-18T16:00:00Z"
};

const ENTRY_HAS_READ = {
    ...ENTRY,
    has_read: true
};

const ENTRY_NOT_READ = {
    ...ENTRY,
    has_read: false
};

describe("<Entry />", () => {
    const mockToggleEntry = jest.fn();

    beforeEach(() => {
        mockToggleEntry.mockReset();
    });

    it("renders the correct class & id", () => {
        const wrapper = shallow(
            <Entry
                entry={ENTRY_HAS_READ}
                toggleEntry={mockToggleEntry}
                isActive={true}
                shouldShowImages={true}
            />
        );

        expect(wrapper.find("div.rss-entry-container").prop("id")).toBe(
            `rss-entry-item-${ENTRY._id}`
        );
    });

    it("unread Entry shows unread class", () => {
        const wrapper = shallow(
            <Entry
                entry={ENTRY_NOT_READ}
                toggleEntry={mockToggleEntry}
                isActive={true}
                shouldShowImages={true}
            />
        );

        expect(wrapper.find("div.rss-entry-title-unread")).toHaveLength(1);
    });

    it("has read Entry shows hasread class", () => {
        const wrapper = shallow(
            <Entry
                entry={ENTRY_HAS_READ}
                toggleEntry={mockToggleEntry}
                isActive={true}
                shouldShowImages={true}
            />
        );

        expect(wrapper.find("div.rss-entry-title-hasread")).toHaveLength(1);
    });

    it("displays the entry title", () => {
        const wrapper = shallow(
            <Entry
                entry={ENTRY_HAS_READ}
                toggleEntry={mockToggleEntry}
                isActive={true}
                shouldShowImages={true}
            />
        );

        expect(wrapper.find("div.rss-entry-title-hasread").text()).toBe(
            ENTRY.title
        );
    });

    it("fires toggleEntry on title click", () => {
        const wrapper = shallow(
            <Entry
                entry={ENTRY_HAS_READ}
                toggleEntry={mockToggleEntry}
                isActive={true}
                shouldShowImages={true}
            />
        );
        wrapper.find("div.rss-entry-title-hasread").simulate("click");
        expect(mockToggleEntry.mock.calls).toEqual([[ENTRY._id]]);
    });

    it("shows <Content /> when active", () => {
        const wrapper = mount(
            <Entry
                entry={ENTRY_HAS_READ}
                toggleEntry={mockToggleEntry}
                isActive={true}
                shouldShowImages={true}
            />
        );

        expect(
            wrapper.contains(
                <Content entry={ENTRY_HAS_READ} shouldShowImages={true} />
            )
        ).toBe(true);
    });

    it("does not render <Content /> when inactive", () => {
        const wrapper = mount(
            <Entry
                entry={ENTRY_HAS_READ}
                toggleEntry={mockToggleEntry}
                isActive={false}
                shouldShowImages={true}
            />
        );

        expect(
            wrapper.contains(
                <Content entry={ENTRY_HAS_READ} shouldShowImages={true} />
            )
        ).toBe(false);
    });
});