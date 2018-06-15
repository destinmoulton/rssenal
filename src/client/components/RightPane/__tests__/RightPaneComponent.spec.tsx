import * as React from "react";
import { shallow } from "enzyme";
declare global {
    namespace NodeJS {
        interface Global {
            Headers: () => void;
        }
    }
}

global.Headers = jest.fn().mockImplementation(() => {
    return { append: () => {} };
});
import RightPaneComponent from "../RightPaneComponent";

describe("<RightPaneComponent />", () => {
    it("renders and matches the snapshot", () => {
        const wrapper = shallow(
            <RightPaneComponent filterTitle={"TEST_FILTER_TITLE"} />
        );

        expect(wrapper).toMatchSnapshot();
    });
});
