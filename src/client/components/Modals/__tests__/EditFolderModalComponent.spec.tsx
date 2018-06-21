import * as React from "react";

import { shallow } from "enzyme";

import EditFolderModalComponent from "../EditFolderModalComponent";

import folder from "../../../../../test/data/folder";

describe("<EditFolderModalComponent />", () => {
    describe("renders and matches the snapshots", () => {
        it("matches the snapshot for Add New Folder", () => {
            const wrapper = shallow(
                <EditFolderModalComponent
                    folder={{ _id: "", name: "", order: 0 }}
                    isModalOpen={true}
                    onCloseModal={jest.fn()}
                    beginSaveFolder={jest.fn()}
                />
            );
            expect(wrapper).toMatchSnapshot();
        });

        it("matches the snapshot for Edit Existing Folder", () => {
            const wrapper = shallow(
                <EditFolderModalComponent
                    folder={folder}
                    isModalOpen={true}
                    onCloseModal={jest.fn()}
                    beginSaveFolder={jest.fn()}
                />
            );
            expect(wrapper).toMatchSnapshot();
        });
    });
});
