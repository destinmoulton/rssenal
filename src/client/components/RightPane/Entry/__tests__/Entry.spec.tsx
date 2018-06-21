import * as React from "react";

import { mount, shallow } from "enzyme";

import Entry from "../Entry";
import Content from "../Content";
import ENTRY_DATA from "../../../../../../test/data/entry";

const ENTRY_HAS_READ = {
    ...ENTRY_DATA,
    has_read: true
};

const ENTRY_NOT_READ = {
    ...ENTRY_DATA,
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
            `rss-entry-item-${ENTRY_DATA._id}`
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
            ENTRY_DATA.title
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
        expect(mockToggleEntry.mock.calls).toEqual([[ENTRY_DATA._id]]);
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
