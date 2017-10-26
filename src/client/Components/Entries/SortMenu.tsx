import PropTypes from "prop-types";
import * as React from "react";

import { Select } from "semantic-ui-react";

const MENU_OPTIONS = [
    {key: "publish_date:asc", value: "publish_date:asc", text: "Date - Oldest First"},
    {key: "publish_date:desc", value: "publish_date:desc", text: "Date - Newest First"},
    {key: "title:asc", value: "title:asc", text: "Title"},
];

class SortMenu extends React.Component {
    static propTypes = {
        currentSortBy: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    };

    render() {
        const { currentSortBy, onChange } = this.props;
        return (
            <Select
                options={MENU_OPTIONS}
                onChange={onChange}
                defaultValue={currentSortBy}/>
        );
    }
}

export default SortMenu;