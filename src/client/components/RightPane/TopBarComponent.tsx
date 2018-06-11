import * as React from "react";

import SortMenu from "./SortMenu";
import SettingsModalContainer from "../../containers/Modals/SettingsModalContainer";

interface ITopBarProps {
    title: string;
    onChangeSort: (e: any, data: any) => void;
    sortBy: string;
}

class TopBarComponent extends React.Component<ITopBarProps> {
    render() {
        const { onChangeSort, sortBy, title } = this.props;
        return (
            <div className="rss-rightpane-topbar">
                <div className="rss-rightpane-topbar-title-container">
                    {title}
                </div>
                <div className="rss-rightpane-topbar-sortselect-container">
                    <SortMenu onChange={onChangeSort} currentSortBy={sortBy} />&nbsp;&nbsp;
                    <SettingsModalContainer />
                </div>
            </div>
        );
    }
}

export default TopBarComponent;
