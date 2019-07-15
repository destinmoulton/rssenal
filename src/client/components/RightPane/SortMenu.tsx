import debug from "debug";
import * as React from "react";

import { Dropdown } from "semantic-ui-react";

import { SORT_MENU_OPTIONS } from "../../constants";
const log = debug("rssenal:SortMenu");

interface ISortMenuProps {
    currentSortBy: string;
    onChange: (e: any, data: any) => void;
}

const SortMenu = (props: ISortMenuProps) => {
    log("SortMenu()");
    const { currentSortBy, onChange } = props;
    return (
        <span>
            Sorting by&nbsp;
            <Dropdown
                inline
                defaultValue={currentSortBy}
                onChange={onChange}
                options={SORT_MENU_OPTIONS}
            />
        </span>
    );
};

export default SortMenu;
