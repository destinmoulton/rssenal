import * as React from "react";

import { Select } from "semantic-ui-react";

const MENU_OPTIONS = [
    {key: "publish_date:asc", value: "publish_date:asc", text: "Date - Oldest First"},
    {key: "publish_date:desc", value: "publish_date:desc", text: "Date - Newest First"},
    {key: "title:asc", value: "title:asc", text: "Title"},
];

interface ISortMenuProps {
    currentSortBy: string;
    onChange: (e: Event, obj: any)=>void;
}

const SortMenu = (props: ISortMenuProps)=>{
    const { currentSortBy, onChange } = props;
    return (
        <Select
            options={MENU_OPTIONS}
            onChange={onChange}
            defaultValue={currentSortBy} />
    );
}

export default SortMenu;