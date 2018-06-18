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
import Browser from "../Browser";

describe("<Browser />", () => {
    it("renders a snapshot", () => {
        const wrapper = shallow(<Browser />);

        expect(wrapper).toMatchSnapshot();
    });
});
