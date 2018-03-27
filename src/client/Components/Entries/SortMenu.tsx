import * as React from "react";

import { Dropdown } from "semantic-ui-react";

const MENU_OPTIONS = [
    { value: "publish_date:asc", text: "Date - Oldest First" },
    { value: "publish_date:desc", text: "Date - Newest First" },
    { value: "title:asc", text: "Title" }
];

interface ISortMenuProps {
    currentSortBy: string;
    onChange: (e: any, data: any) => void;
}

const SortMenu = (props: ISortMenuProps) => {
    const { currentSortBy, onChange } = props;
    return (
        <span>
            Sorting by&nbsp;
            <Dropdown
                inline
                defaultValue={currentSortBy}
                onChange={onChange}
                options={MENU_OPTIONS}
            />
        </span>
    );
};

export default SortMenu;
