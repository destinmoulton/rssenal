import * as React from "react";

const MENU_OPTIONS = [
    { value: "publish_date:asc", text: "Date - Oldest First" },
    { value: "publish_date:desc", text: "Date - Newest First" },
    { value: "title:asc", text: "Title" }
];

interface ISortMenuProps {
    currentSortBy: string;
    onChange: (e: any) => void;
}

const SortMenu = (props: ISortMenuProps) => {
    const { currentSortBy, onChange } = props;

    const optionList = MENU_OPTIONS.map(option => {
        return (
            <option
                key={option.value}
                value={option.value}
                selected={option.value === currentSortBy}
            >
                {option.text}
            </option>
        );
    });
    return <select onChange={onChange}>{optionList}</select>;
};

export default SortMenu;
